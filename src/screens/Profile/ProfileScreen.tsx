import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  FlatList, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { Starter, Recipe } from '../../types';

export default function ProfileScreen({ navigation, route }: any) {
  const session = route.params?.session;
  const profile = route.params?.profile;
  const [starters, setStarters] = useState<Starter[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'starters' | 'recipes'>('starters');

  useFocusEffect(useCallback(() => { if (session) loadData(); }, []));

  async function loadData() {
    setLoading(true);
    const [startersRes, recipesRes] = await Promise.all([
      supabase.from('starters').select('*, profiles(username)').eq('owner_id', session.user.id).order('created_at', { ascending: false }),
      supabase.from('recipes').select('*').eq('author_id', session.user.id).order('created_at', { ascending: false }),
    ]);
    setStarters((startersRes.data ?? []) as Starter[]);
    setRecipes((recipesRes.data ?? []) as Recipe[]);
    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  async function toggleStarterAvailability(starter: Starter) {
    await supabase.from('starters').update({ is_available: !starter.is_available }).eq('id', starter.id);
    setStarters(prev => prev.map(s => s.id === starter.id ? { ...s, is_available: !s.is_available } : s));
  }

  if (!session) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>👤</Text>
        <Text style={styles.emptyTitle}>Not signed in</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{profile?.username?.[0]?.toUpperCase() ?? '?'}</Text>
        </View>
        <Text style={styles.username}>{profile?.username ?? 'Baker'}</Text>
        <Text style={styles.email}>{session.user.email}</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{starters.length}</Text>
            <Text style={styles.statLabel}>Starters</Text>
          </View>
          <View style={styles.statSep} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{recipes.length}</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'starters' && styles.tabActive]}
          onPress={() => setActiveTab('starters')}>
          <Text style={[styles.tabText, activeTab === 'starters' && styles.tabTextActive]}>🌾 My Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'recipes' && styles.tabActive]}
          onPress={() => setActiveTab('recipes')}>
          <Text style={[styles.tabText, activeTab === 'recipes' && styles.tabTextActive]}>🍞 My Recipes</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator color={Colors.primary} /></View>
      ) : activeTab === 'starters' ? (
        <View style={styles.listSection}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddStarter', { session })}>
            <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
            <Text style={styles.addBtnText}>Register New Starter</Text>
          </TouchableOpacity>
          {starters.length === 0 ? (
            <View style={styles.tabEmpty}>
              <Text style={styles.tabEmptyText}>No starters yet. Add your first one!</Text>
            </View>
          ) : (
            starters.map(starter => (
              <View key={starter.id} style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{starter.name}</Text>
                  <Text style={styles.itemMeta}>{starter.age_days != null ? `${starter.age_days}d old • ` : ''}{starter.hydration_pct != null ? `${starter.hydration_pct}% hydration` : ''}</Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={[styles.availBadge, { backgroundColor: starter.is_available ? Colors.success + '20' : Colors.border }]}
                    onPress={() => toggleStarterAvailability(starter)}>
                    <Text style={[styles.availText, { color: starter.is_available ? Colors.success : Colors.textLight }]}>
                      {starter.is_available ? 'Available' : 'Unavailable'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('FamilyTree', { starterId: starter.id, session })}>
                    <Ionicons name="git-network-outline" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      ) : (
        <View style={styles.listSection}>
          {recipes.length === 0 ? (
            <View style={styles.tabEmpty}>
              <Text style={styles.tabEmptyText}>No recipes yet. Share your first recipe!</Text>
            </View>
          ) : (
            recipes.map(recipe => (
              <TouchableOpacity
                key={recipe.id}
                style={styles.itemCard}
                onPress={() => navigation.navigate('RecipeDetail', { recipe, session })}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{recipe.title}</Text>
                  <Text style={styles.itemMeta}>{recipe.likes_count} likes • {new Date(recipe.created_at).toLocaleDateString()}</Text>
                </View>
                {recipe.enhanced_json && (
                  <View style={styles.aiBadge}>
                    <Text style={styles.aiBadgeText}>✨ AI</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  profileHeader: {
    backgroundColor: Colors.white, padding: Spacing.xl, alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md,
  },
  avatarText: { color: Colors.white, fontSize: 32, fontWeight: '800' },
  username: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  email: { fontSize: 13, color: Colors.textLight, marginTop: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.lg, gap: Spacing.xl },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: 12, color: Colors.textLight },
  statSep: { width: 1, height: 30, backgroundColor: Colors.border },
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs,
  },
  signOutText: { color: Colors.textSecondary, fontSize: 14 },
  tabs: { flexDirection: 'row', backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { flex: 1, padding: Spacing.md, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: Colors.primary },
  center: { padding: Spacing.xl, alignItems: 'center' },
  listSection: { padding: Spacing.md },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    borderWidth: 1, borderColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.md, justifyContent: 'center',
    borderStyle: 'dashed',
  },
  addBtnText: { color: Colors.primary, fontWeight: '600' },
  tabEmpty: { alignItems: 'center', padding: Spacing.xl },
  tabEmptyText: { color: Colors.textSecondary },
  itemCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    marginBottom: Spacing.sm, ...Shadow.sm, flexDirection: 'row', alignItems: 'center',
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  itemMeta: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  itemActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  availBadge: { borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 3 },
  availText: { fontSize: 12, fontWeight: '600' },
  aiBadge: { backgroundColor: Colors.primary + '15', borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 3 },
  aiBadgeText: { color: Colors.primary, fontSize: 11, fontWeight: '700' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.text },
});
