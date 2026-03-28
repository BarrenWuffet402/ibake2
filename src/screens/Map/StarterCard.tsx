import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { Starter } from '../../types';
import { formatDistance } from '../../utils/distance';

interface Props {
  starter: Starter;
  onPress: () => void;
  onRequest: () => void;
  isOwn?: boolean;
}

export default function StarterCard({ starter, onPress, onRequest, isOwn }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.row}>
        {starter.photo_url ? (
          <Image source={{ uri: starter.photo_url }} style={styles.photo} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoEmoji}>🌾</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{starter.name}</Text>
          <Text style={styles.owner}>by {starter.profiles?.username ?? 'unknown'}</Text>
          <View style={styles.tags}>
            {starter.age_days != null && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{starter.age_days}d old</Text>
              </View>
            )}
            {starter.hydration_pct != null && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>{starter.hydration_pct}% hydration</Text>
              </View>
            )}
          </View>
          {starter.distance != null && (
            <View style={styles.distanceRow}>
              <Ionicons name="location-outline" size={12} color={Colors.textLight} />
              <Text style={styles.distance}>{formatDistance(starter.distance)}</Text>
            </View>
          )}
        </View>
        {!isOwn && starter.is_available && (
          <TouchableOpacity style={styles.requestBtn} onPress={onRequest}>
            <Text style={styles.requestText}>Request</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    marginHorizontal: Spacing.md, marginVertical: Spacing.xs, ...Shadow.sm,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  photo: { width: 60, height: 60, borderRadius: Radius.md, marginRight: Spacing.md },
  photoPlaceholder: {
    width: 60, height: 60, borderRadius: Radius.md, backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  photoEmoji: { fontSize: 28 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: Colors.text },
  owner: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.xs, gap: 4 },
  tag: { backgroundColor: Colors.background, borderRadius: Radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  tagText: { fontSize: 11, color: Colors.textSecondary },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  distance: { fontSize: 11, color: Colors.textLight, marginLeft: 2 },
  requestBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm, paddingVertical: 6,
  },
  requestText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
});
