import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { SharingRequest } from '../../types';
import ScreenHeader from '../../components/ScreenHeader';

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
      .select(`*, starters(name, photo_url),
        requester:profiles!sharing_requests_requester_id_fkey(username),
        owner:profiles!sharing_requests_owner_id_fkey(username)`)
      .or(`requester_id.eq.${session.user.id},owner_id.eq.${session.user.id}`)
      .order('created_at', { ascending: false });
    setRequests((data ?? []) as SharingRequest[]);
    setLoading(false);
  }

  async function handleAccept(request: SharingRequest) {
    await supabase.from('sharing_requests').update({ status: 'accepted' }).eq('id', request.id);
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

  const statusConfig = {
    pending: { color: Colors.gold, bg: Colors.goldMuted, label: 'Pending' },
    accepted: { color: Colors.accent, bg: Colors.accentMuted, label: 'Accepted' },
    declined: { color: Colors.error, bg: Colors.roseMuted, label: 'Declined' },
  };

  function renderRequest({ item }: { item: SharingRequest }) {
    const isOwner = item.owner_id === session?.user?.id;
    const otherUser = isOwner ? item.requester : item.owner;
    const status = statusConfig[item.status] ?? statusConfig.pending;
    const initial = (otherUser as any)?.username?.[0]?.toUpperCase() ?? '?';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => item.status === 'accepted' && navigation.navigate('Chat', { request: item, session })}
        activeOpacity={item.status === 'accepted' ? 0.8 : 1}>
        <View style={styles.cardAccent} />
        <View style={styles.cardInner}>
          <View style={[styles.avatar, { backgroundColor: isOwner ? Colors.primary : Colors.accent }]}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{(otherUser as any)?.username ?? 'Unknown Baker'}</Text>
            <Text style={styles.requestDesc}>
              {isOwner ? 'Requesting' : 'You requested'} ·{' '}
              <Text style={styles.starterName}>"{(item.starters as any)?.name ?? 'starter'}"</Text>
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        {item.status === 'pending' && isOwner && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAccept(item)} activeOpacity={0.85}>
              <Ionicons name="checkmark" size={16} color={Colors.white} />
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineBtn} onPress={() => handleDecline(item)} activeOpacity={0.85}>
              <Ionicons name="close" size={16} color={Colors.error} />
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === 'accepted' && (
          <View style={styles.chatPrompt}>
            <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.primary} />
            <Text style={styles.chatPromptText}>Open conversation →</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Messages" subtitle="Starter sharing conversations" ornament="✦ Inbox" />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : requests.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>💬</Text>
          <Text style={styles.emptyTitle}>No messages yet</Text>
          <Text style={styles.emptySubtitle}>Request a starter on the map to start chatting with fellow bakers</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={item => item.id}
          renderItem={renderRequest}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { padding: Spacing.md },

  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.border, overflow: 'hidden', ...Shadow.sm,
  },
  cardAccent: { height: 3, backgroundColor: Colors.gold, opacity: 0.5 },
  cardInner: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: Spacing.md },
  avatar: {
    width: 46, height: 46, borderRadius: 23,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 18, fontWeight: '800' },
  info: { flex: 1 },
  name: { fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: '700', color: Colors.primary },
  requestDesc: { ...Typography.caption, marginTop: 3 },
  starterName: { color: Colors.primary, fontWeight: '600' },
  statusBadge: { borderRadius: Radius.sm, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },

  actions: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.md, paddingBottom: Spacing.md },
  acceptBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.accent, borderRadius: Radius.md, padding: Spacing.sm, gap: 4,
  },
  acceptText: { color: Colors.white, fontWeight: '700', fontSize: 13 },
  declineBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.error + '60', borderRadius: Radius.md,
    padding: Spacing.sm, gap: 4, backgroundColor: Colors.roseMuted,
  },
  declineText: { color: Colors.error, fontWeight: '700', fontSize: 13 },
  chatPrompt: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: Spacing.md, paddingBottom: Spacing.md,
  },
  chatPromptText: { fontSize: 13, color: Colors.primary, fontStyle: 'italic' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: Colors.primary, fontWeight: '700', marginBottom: Spacing.sm },
  emptySubtitle: { ...Typography.body, textAlign: 'center' },
});
