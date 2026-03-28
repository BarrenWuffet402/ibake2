import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { Message, SharingRequest } from '../../types';

export default function ChatScreen({ route }: any) {
  const { request, session }: { request: SharingRequest; session: any } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const otherUser = request.requester_id === session.user.id ? request.owner : request.requester;

  useEffect(() => {
    loadMessages();
    const channel = supabase
      .channel(`chat:${request.id}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `request_id=eq.${request.id}` },
        async (payload) => {
          const { data } = await supabase
            .from('messages')
            .select('*, sender:profiles!messages_sender_id_fkey(username)')
            .eq('id', payload.new.id).single();
          if (data) {
            setMessages(prev => [...prev, data as Message]);
            setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
          }
        })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function loadMessages() {
    setLoading(true);
    const { data } = await supabase
      .from('messages')
      .select('*, sender:profiles!messages_sender_id_fkey(username)')
      .eq('request_id', request.id).order('created_at', { ascending: true });
    setMessages((data ?? []) as Message[]);
    setLoading(false);
    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;
    setSending(true);
    const text = newMessage.trim();
    setNewMessage('');
    await supabase.from('messages').insert({ request_id: request.id, sender_id: session.user.id, content: text });
    setSending(false);
  }

  function renderMessage({ item }: { item: Message }) {
    const isMe = item.sender_id === session.user.id;
    const time = new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <View style={[styles.messageRow, isMe && styles.messageRowMe]}>
        {!isMe && (
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarSmallText}>{(item.sender as any)?.username?.[0]?.toUpperCase() ?? '?'}</Text>
          </View>
        )}
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
          <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{item.content}</Text>
          <Text style={[styles.bubbleTime, isMe && styles.bubbleTimeMe]}>{time}</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      {/* Chat header */}
      <View style={styles.chatHeader}>
        <View style={styles.headerAccent} />
        <View style={styles.chatHeaderInner}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{(otherUser as any)?.username?.[0]?.toUpperCase() ?? '?'}</Text>
          </View>
          <View>
            <Text style={styles.headerName}>{(otherUser as any)?.username ?? 'Baker'}</Text>
            <Text style={styles.headerSub}>re: {(request.starters as any)?.name ?? 'starter sharing'}</Text>
          </View>
          <View style={styles.onlineDot} />
        </View>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Text style={styles.emptyChatEmoji}>👋</Text>
              <Text style={styles.emptyChatText}>Say hello to start the conversation</Text>
            </View>
          }
        />
      )}

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={newMessage} onChangeText={setNewMessage}
          placeholder="Write a message..."
          placeholderTextColor={Colors.textMuted}
          multiline
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={[styles.sendBtn, !newMessage.trim() && styles.sendBtnDisabled]} onPress={sendMessage} disabled={sending || !newMessage.trim()}>
          {sending
            ? <ActivityIndicator size="small" color={Colors.white} />
            : <Ionicons name="send" size={17} color={Colors.white} />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  chatHeader: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerAccent: { height: 3, backgroundColor: Colors.gold, opacity: 0.5 },
  chatHeaderInner: {
    flexDirection: 'row', alignItems: 'center', padding: Spacing.md, gap: Spacing.md,
  },
  headerAvatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  headerAvatarText: { color: Colors.white, fontWeight: '800', fontSize: 16 },
  headerName: { fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: '700', color: Colors.primary },
  headerSub: { ...Typography.caption, marginTop: 1, fontStyle: 'italic' },
  onlineDot: {
    marginLeft: 'auto', width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  messagesList: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.sm },

  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm, marginBottom: Spacing.xs },
  messageRowMe: { flexDirection: 'row-reverse' },
  avatarSmall: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarSmallText: { color: Colors.white, fontSize: 12, fontWeight: '700' },

  bubble: { maxWidth: '72%', borderRadius: Radius.lg, padding: Spacing.md },
  bubbleMe: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4, ...Shadow.sm,
  },
  bubbleThem: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1, borderColor: Colors.border, ...Shadow.sm,
  },
  bubbleText: { fontSize: 15, color: Colors.text, lineHeight: 22 },
  bubbleTextMe: { color: Colors.white },
  bubbleTime: { fontSize: 10, color: Colors.textMuted, marginTop: 4, alignSelf: 'flex-end' },
  bubbleTimeMe: { color: Colors.white + '99' },

  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm,
    padding: Spacing.sm, backgroundColor: Colors.surface,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    fontSize: 15, color: Colors.text, maxHeight: 100,
    backgroundColor: Colors.background, fontFamily: 'Georgia, serif',
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', ...Shadow.sm,
  },
  sendBtnDisabled: { backgroundColor: Colors.border },
  emptyChat: { flex: 1, alignItems: 'center', paddingTop: 80, gap: Spacing.md },
  emptyChatEmoji: { fontSize: 48 },
  emptyChatText: { ...Typography.body, fontStyle: 'italic' },
});
