import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
  ActivityIndicator, Alert, Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { Starter } from '../../types';
import { haversineDistance } from '../../utils/distance';
import StarterCard from './StarterCard';

const DEFAULT_RADIUS_KM = 10;

export default function MapScreen({ navigation, route }: any) {
  const session = route.params?.session;
  const [starters, setStarters] = useState<Starter[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  useFocusEffect(useCallback(() => { loadStarters(); }, []));

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      }
    })();
  }, []);

  async function loadStarters() {
    setLoading(true);
    const { data, error } = await supabase
      .from('starters')
      .select('*, profiles(username, avatar_url)')
      .eq('is_available', true);

    if (error) { setLoading(false); return; }

    let filtered = (data ?? []) as Starter[];
    if (userLocation) {
      filtered = filtered
        .map(s => ({ ...s, distance: haversineDistance(userLocation.lat, userLocation.lng, s.location_lat, s.location_lng) }))
        .filter(s => s.distance! <= DEFAULT_RADIUS_KM)
        .sort((a, b) => a.distance! - b.distance!);
    }
    setStarters(filtered);
    setLoading(false);
  }

  async function handleRequest(starter: Starter) {
    if (!session) { Alert.alert('Sign in required'); return; }
    if (starter.owner_id === session.user.id) { Alert.alert('This is your starter!'); return; }

    const { data: existing } = await supabase
      .from('sharing_requests')
      .select('id')
      .eq('starter_id', starter.id)
      .eq('requester_id', session.user.id)
      .eq('status', 'pending')
      .single();

    if (existing) { Alert.alert('Already requested', 'You already have a pending request for this starter.'); return; }

    const { error } = await supabase.from('sharing_requests').insert({
      starter_id: starter.id,
      requester_id: session.user.id,
      owner_id: starter.owner_id,
    });

    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Request Sent!', 'The owner will be notified of your request.');
  }

  const mapRegion = userLocation ? {
    latitude: userLocation.lat,
    longitude: userLocation.lng,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  } : { latitude: 51.5074, longitude: -0.1278, latitudeDelta: 0.15, longitudeDelta: 0.15 };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Starters</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.viewToggle}
            onPress={() => setViewMode(v => v === 'map' ? 'list' : 'map')}>
            <Ionicons name={viewMode === 'map' ? 'list' : 'map'} size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddStarter', { session })}>
            <Ionicons name="add" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={mapRegion} provider={Platform.OS === 'android' ? PROVIDER_DEFAULT : undefined}>
            {userLocation && (
              <Marker coordinate={{ latitude: userLocation.lat, longitude: userLocation.lng }} title="You are here">
                <View style={styles.userMarker}><Text>📍</Text></View>
              </Marker>
            )}
            {starters.map(starter => (
              <Marker
                key={starter.id}
                coordinate={{ latitude: starter.location_lat, longitude: starter.location_lng }}
                title={starter.name}
                description={starter.profiles?.username}
                onCalloutPress={() => navigation.navigate('StarterDetail', { starter, session })}
              >
                <View style={styles.starterMarker}><Text style={styles.markerText}>🌾</Text></View>
              </Marker>
            ))}
          </MapView>
          <View style={styles.mapBadge}>
            <Text style={styles.mapBadgeText}>{starters.length} starters within {DEFAULT_RADIUS_KM}km</Text>
          </View>
        </View>
      ) : loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>
      ) : starters.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🌾</Text>
          <Text style={styles.emptyTitle}>No starters nearby</Text>
          <Text style={styles.emptySubtitle}>Be the first to register your starter in this area!</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('AddStarter', { session })}>
            <Text style={styles.emptyBtnText}>Add My Starter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={starters}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <StarterCard
              starter={item}
              onPress={() => navigation.navigate('StarterDetail', { starter: item, session })}
              onRequest={() => handleRequest(item)}
              isOwn={item.owner_id === session?.user?.id}
            />
          )}
          contentContainerStyle={{ paddingVertical: Spacing.sm }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: Spacing.md, paddingTop: Spacing.lg, backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  headerActions: { flexDirection: 'row', gap: Spacing.sm },
  viewToggle: {
    width: 36, height: 36, borderRadius: Radius.full, backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
  },
  addBtn: {
    width: 36, height: 36, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  mapContainer: { flex: 1 },
  map: { flex: 1 },
  userMarker: { padding: 4, backgroundColor: Colors.white, borderRadius: Radius.full },
  starterMarker: {
    backgroundColor: Colors.white, borderRadius: Radius.full,
    padding: 6, ...Shadow.sm, borderWidth: 2, borderColor: Colors.primary,
  },
  markerText: { fontSize: 18 },
  mapBadge: {
    position: 'absolute', bottom: 20, alignSelf: 'center',
    backgroundColor: Colors.primary, borderRadius: Radius.full,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
  },
  mapBadgeText: { color: Colors.white, fontSize: 13, fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  emptySubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.lg },
  emptyBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md },
  emptyBtnText: { color: Colors.white, fontWeight: '700' },
});
