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
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { Starter } from '../../types';
import { haversineDistance } from '../../utils/distance';
import StarterCard from './StarterCard';
import ScreenHeader from '../../components/ScreenHeader';

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
    const { data } = await supabase
      .from('starters')
      .select('*, profiles(username, avatar_url)')
      .eq('is_available', true);

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

    if (existing) { Alert.alert('Already requested', 'You have a pending request for this starter.'); return; }

    const { error } = await supabase.from('sharing_requests').insert({
      starter_id: starter.id,
      requester_id: session.user.id,
      owner_id: starter.owner_id,
    });

    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Request sent', 'The owner will be notified.');
  }

  const mapRegion = userLocation
    ? { latitude: userLocation.lat, longitude: userLocation.lng, latitudeDelta: 0.15, longitudeDelta: 0.15 }
    : { latitude: 51.5074, longitude: -0.1278, latitudeDelta: 0.15, longitudeDelta: 0.15 };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Starters Nearby"
        subtitle={`Within ${DEFAULT_RADIUS_KM}km · ${starters.length} available`}
        ornament="✦ Discover"
        rightIcon={viewMode === 'map' ? 'list' : 'map'}
        onRightPress={() => setViewMode(v => v === 'map' ? 'list' : 'map')}
      />

      {/* Add starter FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddStarter', { session })}
        activeOpacity={0.85}>
        <Ionicons name="add" size={22} color={Colors.white} />
      </TouchableOpacity>

      {viewMode === 'map' ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={mapRegion}
            provider={Platform.OS === 'android' ? PROVIDER_DEFAULT : undefined}>
            {userLocation && (
              <Marker coordinate={{ latitude: userLocation.lat, longitude: userLocation.lng }} title="You">
                <View style={styles.userMarker}><Text style={{ fontSize: 16 }}>📍</Text></View>
              </Marker>
            )}
            {starters.map(starter => (
              <Marker
                key={starter.id}
                coordinate={{ latitude: starter.location_lat, longitude: starter.location_lng }}
                title={starter.name}
                description={`by ${starter.profiles?.username}`}
                onCalloutPress={() => navigation.navigate('StarterDetail', { starter, session })}>
                <View style={styles.starterMarker}>
                  <Text style={styles.markerText}>🌾</Text>
                </View>
              </Marker>
            ))}
          </MapView>
          <View style={styles.mapLegend}>
            <Text style={styles.mapLegendText}>✦ Tap a marker to view starter details</Text>
          </View>
        </View>
      ) : loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Searching nearby starters...</Text>
        </View>
      ) : starters.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🌾</Text>
          <Text style={styles.emptyTitle}>No starters nearby</Text>
          <Text style={styles.emptySubtitle}>Be the first to share your starter with this community</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('AddStarter', { session })}>
            <Text style={styles.emptyBtnText}>Register My Starter</Text>
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
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  mapContainer: { flex: 1 },
  map: { flex: 1 },
  userMarker: {
    backgroundColor: Colors.surface, borderRadius: Radius.full, padding: 6,
    borderWidth: 2, borderColor: Colors.primary, ...Shadow.sm,
  },
  starterMarker: {
    backgroundColor: Colors.surface, borderRadius: Radius.full, padding: 8,
    borderWidth: 2, borderColor: Colors.gold, ...Shadow.sm,
  },
  markerText: { fontSize: 20 },
  mapLegend: {
    position: 'absolute', bottom: 24, alignSelf: 'center',
    backgroundColor: Colors.primary + 'EE', borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
  },
  mapLegendText: { color: Colors.white, fontSize: 12, letterSpacing: 0.5 },
  fab: {
    position: 'absolute', bottom: 32, right: 20, zIndex: 10,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
    ...Shadow.lg,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  loadingText: { ...Typography.caption, letterSpacing: 1 },
  list: { paddingVertical: Spacing.sm, paddingBottom: 80 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: Colors.primary, fontWeight: '700', marginBottom: Spacing.sm },
  emptySubtitle: { ...Typography.body, textAlign: 'center', marginBottom: Spacing.lg },
  emptyBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, ...Shadow.sm,
  },
  emptyBtnText: { color: Colors.white, fontWeight: '700', letterSpacing: 0.5 },
});
