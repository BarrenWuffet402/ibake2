import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { SharingRequest } from '../../types';

export default function MessagesScreen({ navigation, route }: any) {
  const session = route.params?.session;
  const [requests, setRequests] = useState<SharingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => { loadRequests(); }, []));

  async function loadRequests() {
    if (!session) { setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase
      .from('sharing_requests')
      .select(`
        *,
        starters(name, photo_url),
        requester:profiles!sharing_requests_requester_id_fkey(username),
        owner:profiles!sharing_requests_owner_id_fkey(username)
      `)
      .or(`requester_id.eq.${session.user.id},owner_id.eq.${session.user.id}`)
      .order('created_at', { ascending: false });

    setRequests((data ?? []) as SharingRequest[]);
    setLoading(false);
  }

  async function handleAccept(request: SharingRequest) {
    await supabase.from('sharing_requests').update({ status: 'accepted' }).eq('id', request.id);
    // Create lineage record
    // Child = new starter from requester, parent = original starter
    // For simplicity, we record it but the requester needs to create their own starter first
    loadRequests();
  }

  async function handleDecline(request: SharingRequest) {
    await supabase.from('sharing_requests').update({ status: 'declined' }).eq('id', request.id);
    loadRequests();
  }

  if (!session) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>💬</Text>
        <Text style={styles.emptyTitle}>Sign in to see messages</Text>
      </View>
    );
  }

  function renderRequest({ item }: { item: SharingRequest }) {
    const isOwner = item.owner_id === session?.user?.id;
    const otherUser = isOwner ? item.requester : item.owner;
    const statusColor = { pending: Colors.warning, accepted: Colors.success, declined: Colors.error }[item.status];

    return (
      <TouchableOpacity
        style={styles.requestCard}
        onPress={() => item.status === 'accepted' && navigation.navigate('Chat', { request: item, session })}
        activeOpacity={item.status === 'accepted' ? 0.8 : 1}>
        <View style={styles.requestHeader}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{(otherUser as any)?.username?.[0]?.toUpperCase() ?? '?'}</Text>
          </View>
          <View style={styles.requestInfo}>
            <Text style={styles.requestName}>{(otherUser as any)?.username ?? 'Unknown'}</Text>
            <Text style={styles.requestStarter}>
              {isOwner ? 'wants' : 'you requested'} "{(item.starters as any)?.name ?? 'starter'}"
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
          </View>
        </View>

        {item.status === 'pending' && isOwner && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAccept(item)}>
              <Ionicons name="checkmark" size={16} color={Colors.white} />
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineBtn} onPress={() => handleDecline(item)}>
              <Ionicons name="close" size={16} color={Colors.error} />
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === 'accepted' && (
          <View style={styles.chatPrompt}>
            <Ionicons name="chatbubble-outline" size={14} color={Colors.primary} />
            <Text style={styles.chatPromptText}>Tap to open chat</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>
      ) : requests.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>💬</Text>
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptySubtitle}>Request a starter to start chatting with bakers!</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={item => item.id}
          renderItem={renderRequest}
          contentContainerStyle={{ padding: Spacing.md }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    padding: Spacing.md, paddingTop: Spacing.lg, backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  requestCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    marginBottom: Spacing.sm, ...Shadow.sm,
  },
  requestHeader: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: {
    width: 44, height: 44, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md,
  },
  avatarText: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  requestInfo: { flex: 1 },
  requestName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  requestStarter: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  statusBadge: { borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 3 },
  statusText: { fontSize: 12, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.md },
  acceptBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.success, borderRadius: Radius.md, padding: Spacing.sm, gap: 4,
  },
  acceptText: { color: Colors.white, fontWeight: '700' },
  declineBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.error, borderRadius: Radius.md, padding: Spacing.sm, gap: 4,
  },
  declineText: { color: Colors.error, fontWeight: '700' },
  chatPrompt: {
    flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm, gap: 4,
  },
  chatPromptText: { fontSize: 13, color: Colors.primary },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  emptySubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
});
