import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { EnhancedRecipe } from '../../types';

async function enhanceRecipeWithAI(title: string, ingredients: string, steps: string): Promise<EnhancedRecipe | null> {
  try {
    const { data, error } = await supabase.functions.invoke('enhance-recipe', {
      body: { title, ingredients, steps },
    });
    if (error || !data) return null;
    return data as EnhancedRecipe;
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
    if (photoUris.length >= 3) { Alert.alert('Maximum 3 photos'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.7,
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
    if (!title || !ingredients || !steps) { Alert.alert('Missing fields', 'Please fill in title, ingredients, and steps'); return; }
    if (!session) { Alert.alert('Please sign in'); return; }
    setLoading(true);
    setEnhancing(true);

    const enhanced = await enhanceRecipeWithAI(title, ingredients, steps);
    setEnhancing(false);

    const photoUrls = await uploadPhotos();
    const originalText = `${title}\n\nIngredients:\n${ingredients}\n\nSteps:\n${steps}`;

    const { error } = await supabase.from('recipes').insert({
      author_id: session.user.id,
      title: enhanced?.title ?? title,
      original_text: originalText,
      enhanced_json: enhanced ?? null,
      photo_urls: photoUrls.length > 0 ? photoUrls : null,
    });

    setLoading(false);
    if (error) { Alert.alert('Error', error.message); return; }
    if (!enhanced) Alert.alert('Saved', 'Recipe saved. AI enhancement unavailable right now.');
    else Alert.alert('Published!', '✨ Your recipe has been AI-enhanced and shared.');
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Share a Recipe</Text>
        <Text style={styles.subtitle}>Your knowledge, beautifully preserved</Text>
        <View style={styles.ornamentRow}>
          <View style={styles.ornamentLine} />
          <Text style={styles.ornamentDot}>✦</Text>
          <View style={styles.ornamentLine} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Recipe Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle}
          placeholder="e.g. Norwegian Rye Sourdough" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Ingredients *</Text>
        <TextInput
          style={[styles.input, styles.textArea]} value={ingredients} onChangeText={setIngredients}
          placeholder={"500g bread flour\n375ml water\n10g salt\n100g active starter"}
          placeholderTextColor={Colors.textMuted} multiline numberOfLines={6}
        />

        <Text style={styles.label}>Method / Steps *</Text>
        <TextInput
          style={[styles.input, styles.textAreaLarge]} value={steps} onChangeText={setSteps}
          placeholder={"1. Mix flour and water, rest 30min\n2. Add starter and salt...\n3. Fold every 30 min x4"}
          placeholderTextColor={Colors.textMuted} multiline numberOfLines={8}
        />
      </View>

      <View style={styles.section}>
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
            <TouchableOpacity style={styles.addPhoto} onPress={pickPhoto} activeOpacity={0.8}>
              <Ionicons name="camera-outline" size={22} color={Colors.textMuted} />
              <Text style={styles.addPhotoText}>Add photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.aiNote}>
        <Ionicons name="sparkles-outline" size={16} color={Colors.gold} />
        <Text style={styles.aiNoteText}>Your recipe will be professionally enhanced by AI before publishing</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading} activeOpacity={0.85}>
        {loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={Colors.white} />
            <Text style={styles.buttonText}>{enhancing ? '  Enhancing with AI...' : '  Publishing...'}</Text>
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

  titleBlock: { marginBottom: Spacing.lg },
  title: { fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: '700', color: Colors.primary },
  subtitle: { ...Typography.body, fontSize: 14, marginTop: 4 },
  ornamentRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.md, gap: Spacing.sm },
  ornamentLine: { flex: 1, height: 1, backgroundColor: Colors.gold, opacity: 0.35 },
  ornamentDot: { color: Colors.gold, fontSize: 11 },

  section: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border, ...Shadow.sm,
  },
  label: { ...Typography.label, marginBottom: Spacing.xs, marginTop: Spacing.sm },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 15, color: Colors.text,
    backgroundColor: Colors.background, fontFamily: 'Georgia, serif',
  },
  textArea: { height: 130, textAlignVertical: 'top' },
  textAreaLarge: { height: 190, textAlignVertical: 'top' },

  photosRow: { flexDirection: 'row', gap: Spacing.sm, flexWrap: 'wrap', marginTop: Spacing.xs },
  photoContainer: { position: 'relative' },
  photoThumb: { width: 80, height: 80, borderRadius: Radius.md },
  removePhoto: { position: 'absolute', top: -8, right: -8 },
  addPhoto: {
    width: 80, height: 80, borderRadius: Radius.md, borderWidth: 2, borderColor: Colors.border,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.backgroundDeep, gap: 4,
  },
  addPhotoText: { fontSize: 10, color: Colors.textMuted, fontWeight: '600' },

  aiNote: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.goldMuted, borderRadius: Radius.md, padding: Spacing.md,
    marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.gold + '30',
    borderLeftWidth: 3, borderLeftColor: Colors.gold,
  },
  aiNoteText: { color: Colors.textSecondary, fontSize: 13, flex: 1 },

  button: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md + 2, alignItems: 'center', ...Shadow.md,
  },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});
