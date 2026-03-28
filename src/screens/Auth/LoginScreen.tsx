import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) { Alert.alert('Missing fields', 'Please fill in all fields'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Sign in failed', error.message);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.medallion}>
            <Text style={styles.medallionEmoji}>🍞</Text>
          </View>
          <View style={styles.ornamentRow}>
            <View style={styles.ornamentLine} />
            <Text style={styles.ornamentText}>✦</Text>
            <View style={styles.ornamentLine} />
          </View>
          <Text style={styles.appName}>iBake</Text>
          <Text style={styles.tagline}>Sourdough. Community. Craft.</Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back</Text>
          <View style={styles.cardDivider} />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={Colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={Colors.textMuted}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={styles.buttonText}>Sign In</Text>}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>No account yet? <Text style={styles.linkBold}>Join the community →</Text></Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Handcrafted with love · Est. 2024</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1, padding: Spacing.lg, justifyContent: 'center' },

  hero: { alignItems: 'center', marginBottom: Spacing.xl },
  medallion: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: Colors.surface,
    borderWidth: 2, borderColor: Colors.gold,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadow.md,
  },
  medallionEmoji: { fontSize: 48 },
  ornamentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm, gap: Spacing.sm },
  ornamentLine: { flex: 1, height: 1, backgroundColor: Colors.gold, opacity: 0.4 },
  ornamentText: { color: Colors.gold, fontSize: 12 },
  appName: { ...Typography.displayLarge, fontSize: 42, letterSpacing: 4 },
  tagline: { ...Typography.caption, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.md,
  },
  cardTitle: { ...Typography.heading, fontFamily: 'Georgia, serif', fontSize: 18, marginBottom: Spacing.sm },
  cardDivider: { height: 1, backgroundColor: Colors.divider, marginBottom: Spacing.md },

  label: { ...Typography.label, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 15, color: Colors.text,
    backgroundColor: Colors.background,
    fontFamily: 'Georgia, serif',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    padding: Spacing.md + 2,
    alignItems: 'center',
    marginTop: Spacing.lg,
    ...Shadow.sm,
  },
  buttonText: { color: Colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },

  link: { alignItems: 'center', marginTop: Spacing.lg },
  linkText: { color: Colors.textLight, fontSize: 14 },
  linkBold: { color: Colors.primary, fontWeight: '700' },

  footer: { textAlign: 'center', marginTop: Spacing.xl, ...Typography.caption, letterSpacing: 1 },
});
