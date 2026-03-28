import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { Starter } from '../../types';

export default function StarterDetailScreen({ route, navigation }: any) {
  const { starter, session }: { starter: Starter; session: any } = route.params;
  const [requesting, setRequesting] = useState(false);
  const isOwn = starter.owner_id === session?.user?.id;

  async function handleRequest() {
    if (!session) { Alert.alert('Sign in required'); return; }
    setRequesting(true);
    const { data: existing } = await supabase
      .from('sharing_requests').select('id')
      .eq('starter_id', starter.id).eq('requester_id', session.user.id).eq('status', 'pending').single();
    if (existing) { Alert.alert('Already requested'); setRequesting(false); return; }
    const { error } = await supabase.from('sharing_requests').insert({
      starter_id: starter.id, requester_id: session.user.id, owner_id: starter.owner_id,
    });
    setRequesting(false);
    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Request sent!', 'The owner will be notified of your request.');
  }

  return (
    <ScrollView style={styles.container}>
      {starter.photo_url ? (
        <Image source={{ uri: starter.photo_url }} style={styles.photo} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoEmoji}>🌾</Text>
        </View>
      )}

      {/* Gold accent strip */}
      <View style={styles.goldStrip} />

      <View style={styles.content}>
        {/* Title block */}
        <View style={styles.titleBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{starter.name}</Text>
            {!starter.is_available && (
              <View style={styles.unavailableBadge}>
                <Text style={styles.unavailableText}>Unavailable</Text>
              </View>
            )}
          </View>
          <Text style={styles.owner}>Kept by {starter.profiles?.username ?? 'Unknown Baker'}</Text>
          <View style={styles.ornamentRow}>
            <View style={styles.ornamentLine} />
            <Text style={styles.ornamentDot}>✦</Text>
            <View style={styles.ornamentLine} />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {starter.age_days != null && (
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>⏳</Text>
              <Text style={styles.statValue}>{starter.age_days}</Text>
              <Text style={styles.statLabel}>Days Old</Text>
            </View>
          )}
          {starter.hydration_pct != null && (
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>💧</Text>
              <Text style={styles.statValue}>{starter.hydration_pct}%</Text>
              <Text style={styles.statLabel}>Hydration</Text>
            </View>
          )}
        </View>

        {starter.description ? (
          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionLabel}>About this starter</Text>
            <Text style={styles.description}>{starter.description}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.treeBtn}
          onPress={() => navigation.navigate('FamilyTree', { starterId: starter.id, session })}
          activeOpacity={0.8}>
          <Ionicons name="git-network-outline" size={18} color={Colors.accent} />
          <Text style={styles.treeBtnText}>View Family Tree</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.accent} />
        </TouchableOpacity>

        {!isOwn && starter.is_available && (
          <TouchableOpacity style={styles.requestBtn} onPress={handleRequest} disabled={requesting} activeOpacity={0.85}>
            {requesting ? <ActivityIndicator color={Colors.white} /> : (
              <>
                <Ionicons name="hand-right-outline" size={18} color={Colors.white} />
                <Text style={styles.requestBtnText}>Request This Starter</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  photo: { width: '100%', height: 280 },
  photoPlaceholder: {
    height: 240, backgroundColor: Colors.backgroundDeep,
    alignItems: 'center', justifyContent: 'center',
  },
  photoEmoji: { fontSize: 80 },
  goldStrip: { height: 4, backgroundColor: Colors.gold, opacity: 0.5 },
  content: { padding: Spacing.lg },

  titleBlock: { marginBottom: Spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  name: { fontFamily: 'Georgia, serif', fontSize: 30, fontWeight: '700', color: Colors.primary, flex: 1 },
  unavailableBadge: {
    backgroundColor: Colors.border, borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm, paddingVertical: 4,
  },
  unavailableText: { ...Typography.caption },
  owner: { ...Typography.body, fontSize: 14, marginTop: 4, fontStyle: 'italic' },
  ornamentRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: Spacing.md, gap: Spacing.sm,
  },
  ornamentLine: { flex: 1, height: 1, backgroundColor: Colors.gold, opacity: 0.35 },
  ornamentDot: { color: Colors.gold, fontSize: 11 },

  statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.lg },
  statCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, ...Shadow.sm,
  },
  statEmoji: { fontSize: 22, marginBottom: 4 },
  statValue: { fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: '700', color: Colors.primary },
  statLabel: { ...Typography.label, marginTop: 2 },

  descriptionCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md,
    borderLeftWidth: 3, borderLeftColor: Colors.gold, borderWidth: 1, borderColor: Colors.border,
    marginBottom: Spacing.lg, ...Shadow.sm,
  },
  descriptionLabel: { ...Typography.label, marginBottom: Spacing.sm },
  description: { ...Typography.body },

  treeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    borderWidth: 1, borderColor: Colors.accent + '60', borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.md, backgroundColor: Colors.accentMuted,
    justifyContent: 'center',
  },
  treeBtnText: { color: Colors.accent, fontWeight: '700', flex: 1, textAlign: 'center' },

  requestBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md + 2, justifyContent: 'center', ...Shadow.md,
  },
  requestBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
