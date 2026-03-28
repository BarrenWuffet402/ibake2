import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { useAuth } from './src/hooks/useAuth';
import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from './src/constants/theme';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: string | null }> {
  state = { error: null };
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() {
    if (this.state.error) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: Colors.background }}>
          <Text style={{ fontSize: 32, marginBottom: 16 }}>⚠️</Text>
          <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: '700', marginBottom: 8 }}>App Error</Text>
          <Text style={{ fontSize: 12, color: Colors.textSecondary, textAlign: 'center' }}>{this.state.error}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

function Root() {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <AppNavigator session={session} profile={profile} loading={loading} />
      <StatusBar style="dark" />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Root />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});
