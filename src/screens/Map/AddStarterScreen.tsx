import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';

export default function AddStarterScreen({ navigation, route }: any) {
  const session = route.params?.session;
  const [name, setName] = useState('');
  const [ageDays, setAgeDays] = useState('');
  const [hydration, setHydration] = useState('');
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      }
    })();
  }, []);

  async function pickPhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 0.7,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  }

  async function handleSubmit() {
    if (!name) { Alert.alert('Name required', 'Please give your starter a name'); return; }
    if (!location) { Alert.alert('Location needed', 'Please enable location access'); return; }
    setLoading(true);

    let photoUrl: string | null = null;
    if (photoUri) {
      const ext = photoUri.split('.').pop() ?? 'jpg';
      const filename = `${session.user.id}-${Date.now()}.${ext}`;
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const { error: uploadError } = await supabase.storage
        .from('starter-photos').upload(filename, blob, { contentType: `image/${ext}` });
      if (!uploadError) {
        const { data } = supabase.storage.from('starter-photos').getPublicUrl(filename);
        photoUrl = data.publicUrl;
      }
    }

    const { error } = await supabase.from('starters').insert({
      owner_id: session.user.id, name,
      age_days: ageDays ? parseInt(ageDays) : null,
      hydration_pct: hydration ? parseInt(hydration) : null,
      description: description || null,
      photo_url: photoUrl,
      location_lat: location.lat, location_lng: location.lng,
    });

    setLoading(false);
    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Starter registered!', `${name} is now visible to nearby bakers.`);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Register Your Starter</Text>
        <Text style={styles.subtitle}>Share your culture with the community</Text>
        <View style={styles.ornamentRow}>
          <View style={styles.ornamentLine} />
          <Text style={styles.ornamentDot}>✦</Text>
          <View style={styles.ornamentLine} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Starter Name *</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName}
          placeholder="e.g. Old Faithful, Bjørn, Kimchi..." placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Age (days)</Text>
        <TextInput style={styles.input} value={ageDays} onChangeText={setAgeDays}
          placeholder="e.g. 365" placeholderTextColor={Colors.textMuted} keyboardType="number-pad" />

        <Text style={styles.label}>Hydration %</Text>
        <TextInput style={styles.input} value={hydration} onChangeText={setHydration}
          placeholder="e.g. 100" placeholderTextColor={Colors.textMuted} keyboardType="number-pad" />

        <Text style={styles.label}>Story / Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription}
          placeholder="Tell the story of your starter — where it came from, what makes it special..."
          placeholderTextColor={Colors.textMuted} multiline numberOfLines={4}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Photo</Text>
        <TouchableOpacity style={styles.photoBtn} onPress={pickPhoto} activeOpacity={0.8}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoPreview} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera-outline" size={32} color={Colors.textMuted} />
              <Text style={styles.photoPlaceholderText}>Tap to add a photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {location && (
        <View style={styles.locationCard}>
          <Ionicons name="location" size={16} color={Colors.accent} />
          <Text style={styles.locationText}>Location captured · {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading} activeOpacity={0.85}>
        {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>Register Starter</Text>}
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
  textArea: { height: 110, textAlignVertical: 'top' },

  photoBtn: { borderRadius: Radius.md, overflow: 'hidden', marginTop: Spacing.xs },
  photoPreview: { width: '100%', height: 220, borderRadius: Radius.md },
  photoPlaceholder: {
    height: 140, borderRadius: Radius.md, borderWidth: 2, borderColor: Colors.border,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.backgroundDeep, gap: Spacing.sm,
  },
  photoPlaceholderText: { color: Colors.textMuted, fontSize: 14 },

  locationCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.accentMuted, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderWidth: 1, borderColor: Colors.accent + '30',
  },
  locationText: { color: Colors.accent, fontSize: 13, fontWeight: '600' },

  button: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md + 2, alignItems: 'center', ...Shadow.md,
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});
