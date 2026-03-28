import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { EnhancedRecipe } from '../../types';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? '';

async function enhanceRecipeWithAI(title: string, ingredients: string, steps: string): Promise<EnhancedRecipe | null> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: `You are a professional baker and recipe editor. The user will submit a raw recipe. Your job is to: 1) Fix any unclear steps, 2) Standardize ingredient measurements, 3) Add helpful tips where appropriate, 4) Structure it with clear sections: Ingredients, Method, Tips. Return valid JSON with fields: title, description, ingredients (array of {amount, unit, item}), steps (array of {step_number, instruction, tip?}), tags (array of strings). Return ONLY the JSON object with no markdown or explanation.`,
        messages: [{
          role: 'user',
          content: `Title: ${title}\n\nIngredients:\n${ingredients}\n\nSteps:\n${steps}`,
        }],
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    const text = data.content[0].text;
    return JSON.parse(text) as EnhancedRecipe;
  } catch {
    return null;
  }
}

export default function SubmitRecipeScreen({ navigation, route }: any) {
  const session = route.params?.session;
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [photoUris, setPhotoUris] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  async function pickPhoto() {
    if (photoUris.length >= 3) { Alert.alert('Max 3 photos'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setPhotoUris(prev => [...prev, result.assets[0].uri]);
  }

  async function uploadPhotos(): Promise<string[]> {
    const urls: string[] = [];
    for (const uri of photoUris) {
      const ext = uri.split('.').pop() ?? 'jpg';
      const filename = `recipe-${session.user.id}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const response = await fetch(uri);
      const blob = await response.blob();
      const { error } = await supabase.storage.from('recipe-photos').upload(filename, blob, { contentType: `image/${ext}` });
      if (!error) {
        const { data } = supabase.storage.from('recipe-photos').getPublicUrl(filename);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  }

  async function handleSubmit() {
    if (!title || !ingredients || !steps) { Alert.alert('Error', 'Please fill in title, ingredients, and steps.'); return; }
    if (!session) { Alert.alert('Please sign in'); return; }
    setLoading(true);
    setEnhancing(true);

    const enhanced = await enhanceRecipeWithAI(title, ingredients, steps);
    setEnhancing(false);

    const photoUrls = await uploadPhotos();
    const originalText = `${title}\n\nIngredients:\n${ingredients}\n\nSteps:\n${steps}`;

    const { data, error } = await supabase.from('recipes').insert({
      author_id: session.user.id,
      title: enhanced?.title ?? title,
      original_text: originalText,
      enhanced_json: enhanced ?? null,
      photo_urls: photoUrls.length > 0 ? photoUrls : null,
    }).select().single();

    setLoading(false);
    if (error) { Alert.alert('Error', error.message); return; }
    if (!enhanced) Alert.alert('Note', 'AI enhancement failed. Recipe saved with original content.');
    else Alert.alert('Recipe Published!', '✨ Your recipe has been AI-enhanced and published.');
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Share a Recipe</Text>

      <Text style={styles.label}>Recipe Title *</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Classic Sourdough Loaf" placeholderTextColor={Colors.textLight} />

      <Text style={styles.label}>Ingredients *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={ingredients} onChangeText={setIngredients}
        placeholder="500g bread flour&#10;375ml water&#10;10g salt&#10;100g active starter"
        placeholderTextColor={Colors.textLight} multiline numberOfLines={6}
      />

      <Text style={styles.label}>Steps *</Text>
      <TextInput
        style={[styles.input, styles.textAreaLarge]}
        value={steps} onChangeText={setSteps}
        placeholder="1. Mix flour and water, rest 30min&#10;2. Add starter and salt..."
        placeholderTextColor={Colors.textLight} multiline numberOfLines={8}
      />

      <Text style={styles.label}>Photos (up to 3)</Text>
      <View style={styles.photosRow}>
        {photoUris.map((uri, i) => (
          <View key={i} style={styles.photoContainer}>
            <Image source={{ uri }} style={styles.photoThumb} />
            <TouchableOpacity style={styles.removePhoto} onPress={() => setPhotoUris(prev => prev.filter((_, j) => j !== i))}>
              <Ionicons name="close-circle" size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
        ))}
        {photoUris.length < 3 && (
          <TouchableOpacity style={styles.addPhoto} onPress={pickPhoto}>
            <Ionicons name="camera-outline" size={24} color={Colors.textLight} />
            <Text style={styles.addPhotoText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.aiNote}>
        <Text style={styles.aiNoteText}>✨ Your recipe will be automatically enhanced by AI</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={Colors.white} />
            <Text style={styles.buttonText}>{enhancing ? ' Enhancing with AI...' : ' Saving...'}</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Publish Recipe</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  title: { fontSize: 22, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.lg },
  label: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 16, color: Colors.text, backgroundColor: Colors.white,
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  textAreaLarge: { height: 180, textAlignVertical: 'top' },
  photosRow: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap', marginTop: Spacing.xs },
  photoContainer: { position: 'relative' },
  photoThumb: { width: 80, height: 80, borderRadius: Radius.md },
  removePhoto: { position: 'absolute', top: -8, right: -8 },
  addPhoto: {
    width: 80, height: 80, borderRadius: Radius.md, borderWidth: 2, borderColor: Colors.border,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white,
  },
  addPhotoText: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  aiNote: {
    backgroundColor: Colors.primary + '10', borderRadius: Radius.md,
    padding: Spacing.md, marginTop: Spacing.lg, borderLeftWidth: 3, borderLeftColor: Colors.primary,
  },
  aiNoteText: { color: Colors.primary, fontSize: 14 },
  button: {
    backgroundColor: Colors.primary, borderRadius: Radius.md, padding: Spacing.md,
    alignItems: 'center', marginTop: Spacing.xl,
  },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
