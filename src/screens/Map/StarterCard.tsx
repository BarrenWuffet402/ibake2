import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.accentBar} />
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
          <Text style={styles.owner}>by {starter.profiles?.username ?? 'unknown baker'}</Text>
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
              <Ionicons name="location-outline" size={11} color={Colors.textMuted} />
              <Text style={styles.distance}>{formatDistance(starter.distance)} away</Text>
            </View>
          )}
        </View>
        {!isOwn && starter.is_available && (
          <TouchableOpacity style={styles.requestBtn} onPress={onRequest} activeOpacity={0.8}>
            <Text style={styles.requestText}>Request</Text>
          </TouchableOpacity>
        )}
        {isOwn && (
          <View style={styles.ownBadge}>
            <Text style={styles.ownText}>Mine</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  accentBar: { height: 3, backgroundColor: Colors.gold, opacity: 0.6 },
  row: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  photo: { width: 64, height: 64, borderRadius: Radius.md, marginRight: Spacing.md },
  photoPlaceholder: {
    width: 64, height: 64, borderRadius: Radius.md, backgroundColor: Colors.backgroundDeep,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
    borderWidth: 1, borderColor: Colors.border,
  },
  photoEmoji: { fontSize: 28 },
  info: { flex: 1 },
  name: { fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: '700', color: Colors.primary },
  owner: { ...Typography.caption, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.xs, gap: 4 },
  tag: {
    backgroundColor: Colors.goldMuted, borderRadius: 4,
    paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: Colors.gold + '30',
  },
  tagText: { fontSize: 10, color: Colors.gold, fontWeight: '600' },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 2 },
  distance: { fontSize: 11, color: Colors.textMuted },
  requestBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
  },
  requestText: { color: Colors.white, fontSize: 12, fontWeight: '700', letterSpacing: 0.3 },
  ownBadge: {
    backgroundColor: Colors.accentMuted, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm, paddingVertical: 4, borderWidth: 1, borderColor: Colors.accent + '30',
  },
  ownText: { fontSize: 11, color: Colors.accent, fontWeight: '700' },
});
