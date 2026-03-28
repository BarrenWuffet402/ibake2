import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView,
} from 'react-native';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius } from '../../constants/theme';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password || !username) { Alert.alert('Error', 'Please fill in all fields'); return; }
    if (username.length < 3) { Alert.alert('Error', 'Username must be at least 3 characters'); return; }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { Alert.alert('Error', error.message); setLoading(false); return; }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username,
      });
      if (profileError) Alert.alert('Error', profileError.message);
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logo}>🍞</Text>
          <Text style={styles.title}>Join iBake</Text>
          <Text style={styles.subtitle}>Start your sourdough journey</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="sourdoughmaster"
            placeholderTextColor={Colors.textLight}
            autoCapitalize="none"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={Colors.textLight}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={Colors.textLight}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>Create Account</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Already have an account? <Text style={styles.linkBold}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1, padding: Spacing.lg, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: Spacing.xxl },
  logo: { fontSize: 64 },
  title: { fontSize: 32, fontWeight: '800', color: Colors.primary, marginTop: Spacing.sm },
  subtitle: { fontSize: 16, color: Colors.textSecondary, marginTop: Spacing.xs },
  form: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg },
  label: { fontSize: 14, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs, marginTop: Spacing.sm },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 16, color: Colors.text, backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: Colors.primary, borderRadius: Radius.md, padding: Spacing.md,
    alignItems: 'center', marginTop: Spacing.lg,
  },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  link: { alignItems: 'center', marginTop: Spacing.md },
  linkText: { color: Colors.textSecondary, fontSize: 14 },
  linkBold: { color: Colors.primary, fontWeight: '700' },
});
