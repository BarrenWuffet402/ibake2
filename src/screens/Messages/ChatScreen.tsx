import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
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
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `request_id=eq.${request.id}` },
        async (payload) => {
          const { data } = await supabase
            .from('messages')
            .select('*, sender:profiles!messages_sender_id_fkey(username)')
            .eq('id', payload.new.id)
            .single();
          if (data) {
            setMessages(prev => [...prev, data as Message]);
            setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function loadMessages() {
    setLoading(true);
    const { data } = await supabase
      .from('messages')
      .select('*, sender:profiles!messages_sender_id_fkey(username)')
      .eq('request_id', request.id)
      .order('created_at', { ascending: true });
    setMessages((data ?? []) as Message[]);
    setLoading(false);
    setTimeout(() => flatListRef.current?.scrollToEnd(), 100);
  }

  async function sendMessage() {
    if (!newMessage.trim()) return;
    setSending(true);
    const text = newMessage.trim();
    setNewMessage('');

    await supabase.from('messages').insert({
      request_id: request.id,
      sender_id: session.user.id,
      content: text,
    });
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
      <View style={styles.chatHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{(otherUser as any)?.username?.[0]?.toUpperCase() ?? '?'}</Text>
        </View>
        <View>
          <Text style={styles.chatHeaderName}>{(otherUser as any)?.username ?? 'Baker'}</Text>
          <Text style={styles.chatHeaderSub}>re: {(request.starters as any)?.name ?? 'starter'}</Text>
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
              <Text style={styles.emptyChatText}>Say hello! 👋</Text>
            </View>
          }
        />
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Message..."
          placeholderTextColor={Colors.textLight}
          multiline
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} disabled={sending}>
          {sending ? <ActivityIndicator size="small" color={Colors.white} /> :
            <Ionicons name="send" size={18} color={Colors.white} />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', padding: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
    gap: Spacing.md,
  },
  avatarCircle: {
    width: 40, height: 40, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  chatHeaderName: { fontSize: 16, fontWeight: '700', color: Colors.text },
  chatHeaderSub: { fontSize: 12, color: Colors.textLight },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  messagesList: { padding: Spacing.md, gap: Spacing.sm },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm, marginBottom: Spacing.sm },
  messageRowMe: { flexDirection: 'row-reverse' },
  avatarSmall: {
    width: 28, height: 28, borderRadius: Radius.full, backgroundColor: Colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarSmallText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  bubble: {
    maxWidth: '72%', borderRadius: Radius.md, padding: Spacing.sm, paddingHorizontal: Spacing.md,
  },
  bubbleMe: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: Colors.white, borderBottomLeftRadius: 4, ...Shadow.sm },
  bubbleText: { fontSize: 15, color: Colors.text, lineHeight: 21 },
  bubbleTextMe: { color: Colors.white },
  bubbleTime: { fontSize: 10, color: Colors.textLight, marginTop: 3, alignSelf: 'flex-end' },
  bubbleTimeMe: { color: Colors.white + 'AA' },
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end', padding: Spacing.sm,
    backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.full,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    fontSize: 15, color: Colors.text, maxHeight: 100, backgroundColor: Colors.background,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyChat: { flex: 1, alignItems: 'center', paddingTop: 60 },
  emptyChatText: { fontSize: 16, color: Colors.textLight },
});
