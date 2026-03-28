import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';

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
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  }

  async function handleSubmit() {
    if (!name) { Alert.alert('Error', 'Please enter a starter name'); return; }
    if (!location) { Alert.alert('Error', 'Location required. Please enable location access.'); return; }
    setLoading(true);

    let photoUrl: string | null = null;
    if (photoUri) {
      const ext = photoUri.split('.').pop() ?? 'jpg';
      const filename = `${session.user.id}-${Date.now()}.${ext}`;
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const { error: uploadError } = await supabase.storage
        .from('starter-photos')
        .upload(filename, blob, { contentType: `image/${ext}` });
      if (!uploadError) {
        const { data } = supabase.storage.from('starter-photos').getPublicUrl(filename);
        photoUrl = data.publicUrl;
      }
    }

    const { error } = await supabase.from('starters').insert({
      owner_id: session.user.id,
      name,
      age_days: ageDays ? parseInt(ageDays) : null,
      hydration_pct: hydration ? parseInt(hydration) : null,
      description: description || null,
      photo_url: photoUrl,
      location_lat: location.lat,
      location_lng: location.lng,
    });

    setLoading(false);
    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Success', 'Your starter has been added!');
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Register Your Starter</Text>

      <Text style={styles.label}>Name *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Old Faithful" placeholderTextColor={Colors.textLight} />

      <Text style={styles.label}>Age (days)</Text>
      <TextInput style={styles.input} value={ageDays} onChangeText={setAgeDays} placeholder="e.g. 365" placeholderTextColor={Colors.textLight} keyboardType="number-pad" />

      <Text style={styles.label}>Hydration %</Text>
      <TextInput style={styles.input} value={hydration} onChangeText={setHydration} placeholder="e.g. 100" placeholderTextColor={Colors.textLight} keyboardType="number-pad" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription}
        placeholder="Tell us about your starter..." placeholderTextColor={Colors.textLight} multiline numberOfLines={4}
      />

      <Text style={styles.label}>Photo</Text>
      <TouchableOpacity style={styles.photoBtn} onPress={pickPhoto}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photoPreview} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoPlaceholderText}>📷 Tap to add photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {location && (
        <View style={styles.locationBadge}>
          <Text style={styles.locationText}>📍 Location set ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>Register Starter</Text>}
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
  textArea: { height: 100, textAlignVertical: 'top' },
  photoBtn: { borderRadius: Radius.md, overflow: 'hidden' },
  photoPreview: { width: '100%', height: 200, borderRadius: Radius.md },
  photoPlaceholder: {
    height: 120, borderRadius: Radius.md, borderWidth: 2, borderColor: Colors.border,
    borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white,
  },
  photoPlaceholderText: { color: Colors.textLight, fontSize: 16 },
  locationBadge: {
    backgroundColor: Colors.accent + '20', borderRadius: Radius.sm, padding: Spacing.sm, marginTop: Spacing.md,
  },
  locationText: { color: Colors.accent, fontSize: 13 },
  button: {
    backgroundColor: Colors.primary, borderRadius: Radius.md, padding: Spacing.md,
    alignItems: 'center', marginTop: Spacing.xl,
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
});
