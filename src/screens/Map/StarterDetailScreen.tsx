import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { Starter } from '../../types';

export default function StarterDetailScreen({ route, navigation }: any) {
  const { starter, session }: { starter: Starter; session: any } = route.params;
  const [requesting, setRequesting] = useState(false);
  const isOwn = starter.owner_id === session?.user?.id;

  async function handleRequest() {
    if (!session) { Alert.alert('Sign in required'); return; }
    setRequesting(true);

    const { data: existing } = await supabase
      .from('sharing_requests')
      .select('id')
      .eq('starter_id', starter.id)
      .eq('requester_id', session.user.id)
      .eq('status', 'pending')
      .single();

    if (existing) {
      Alert.alert('Already requested');
      setRequesting(false);
      return;
    }

    const { error } = await supabase.from('sharing_requests').insert({
      starter_id: starter.id,
      requester_id: session.user.id,
      owner_id: starter.owner_id,
    });

    setRequesting(false);
    if (error) { Alert.alert('Error', error.message); return; }
    Alert.alert('Request Sent!', "The owner will be notified.");
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

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{starter.name}</Text>
          {!starter.is_available && (
            <View style={styles.unavailableBadge}>
              <Text style={styles.unavailableText}>Unavailable</Text>
            </View>
          )}
        </View>
        <Text style={styles.owner}>by {starter.profiles?.username ?? 'Unknown Baker'}</Text>

        <View style={styles.statsRow}>
          {starter.age_days != null && (
            <View style={styles.stat}>
              <Text style={styles.statValue}>{starter.age_days}</Text>
              <Text style={styles.statLabel}>days old</Text>
            </View>
          )}
          {starter.hydration_pct != null && (
            <View style={styles.stat}>
              <Text style={styles.statValue}>{starter.hydration_pct}%</Text>
              <Text style={styles.statLabel}>hydration</Text>
            </View>
          )}
        </View>

        {starter.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this starter</Text>
            <Text style={styles.description}>{starter.description}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.treeBtn}
          onPress={() => navigation.navigate('FamilyTree', { starterId: starter.id, session })}>
          <Ionicons name="git-network-outline" size={18} color={Colors.primary} />
          <Text style={styles.treeBtnText}>View Family Tree</Text>
        </TouchableOpacity>

        {!isOwn && starter.is_available && (
          <TouchableOpacity style={styles.requestBtn} onPress={handleRequest} disabled={requesting}>
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
  photo: { width: '100%', height: 240 },
  photoPlaceholder: {
    height: 240, backgroundColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  photoEmoji: { fontSize: 80 },
  content: { padding: Spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { fontSize: 28, fontWeight: '800', color: Colors.primary, flex: 1 },
  unavailableBadge: { backgroundColor: Colors.border, borderRadius: Radius.sm, padding: Spacing.xs },
  unavailableText: { color: Colors.textLight, fontSize: 12 },
  owner: { fontSize: 14, color: Colors.textSecondary, marginTop: 4 },
  statsRow: { flexDirection: 'row', marginTop: Spacing.md, gap: Spacing.md },
  stat: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', ...Shadow.sm,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  section: { marginTop: Spacing.lg },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  description: { fontSize: 15, color: Colors.textSecondary, lineHeight: 22 },
  treeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    borderWidth: 1, borderColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md, marginTop: Spacing.lg, justifyContent: 'center',
  },
  treeBtnText: { color: Colors.primary, fontWeight: '700' },
  requestBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md, marginTop: Spacing.md, justifyContent: 'center',
  },
  requestBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
