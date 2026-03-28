import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
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

  const initial = profile?.username?.[0]?.toUpperCase() ?? '?';

  return (
    <ScrollView style={styles.container}>
      {/* Profile hero */}
      <View style={styles.hero}>
        <View style={styles.heroGold} />
        <View style={styles.heroContent}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
          </View>
          <Text style={styles.username}>{profile?.username ?? 'Baker'}</Text>
          <Text style={styles.email}>{session.user.email}</Text>
          <View style={styles.ornamentRow}>
            <View style={styles.ornamentLine} />
            <Text style={styles.ornamentDot}>✦</Text>
            <View style={styles.ornamentLine} />
          </View>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{starters.length}</Text>
              <Text style={styles.statLabel}>Starters</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{recipes.length}</Text>
              <Text style={styles.statLabel}>Recipes</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.signOutBtn} onPress={() => supabase.auth.signOut()}>
            <Ionicons name="log-out-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['starters', 'recipes'] as const).map(tab => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'starters' ? '🌾 My Starters' : '🍞 My Recipes'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator color={Colors.primary} /></View>
      ) : activeTab === 'starters' ? (
        <View style={styles.listSection}>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddStarter', { session })} activeOpacity={0.8}>
            <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
            <Text style={styles.addBtnText}>Register New Starter</Text>
          </TouchableOpacity>

          {starters.length === 0 ? (
            <View style={styles.tabEmpty}>
              <Text style={styles.tabEmptyEmoji}>🌾</Text>
              <Text style={styles.tabEmptyText}>You haven't registered any starters yet</Text>
            </View>
          ) : starters.map(starter => (
            <View key={starter.id} style={styles.itemCard}>
              <View style={styles.itemAccent} />
              <View style={styles.itemInner}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{starter.name}</Text>
                  <Text style={styles.itemMeta}>
                    {[starter.age_days != null ? `${starter.age_days}d old` : null, starter.hydration_pct != null ? `${starter.hydration_pct}% hydration` : null].filter(Boolean).join(' · ')}
                  </Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity
                    style={[styles.availBadge, { backgroundColor: starter.is_available ? Colors.accentMuted : Colors.border }]}
                    onPress={() => toggleStarterAvailability(starter)}>
                    <Text style={[styles.availText, { color: starter.is_available ? Colors.accent : Colors.textLight }]}>
                      {starter.is_available ? '● Available' : '○ Hidden'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('FamilyTree', { starterId: starter.id, session })}>
                    <Ionicons name="git-network-outline" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.listSection}>
          {recipes.length === 0 ? (
            <View style={styles.tabEmpty}>
              <Text style={styles.tabEmptyEmoji}>🍞</Text>
              <Text style={styles.tabEmptyText}>You haven't shared any recipes yet</Text>
            </View>
          ) : recipes.map(recipe => (
            <TouchableOpacity key={recipe.id} style={styles.itemCard} onPress={() => navigation.navigate('RecipeDetail', { recipe, session })} activeOpacity={0.85}>
              <View style={styles.itemAccent} />
              <View style={styles.itemInner}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{recipe.title}</Text>
                  <Text style={styles.itemMeta}>{recipe.likes_count} likes · {new Date(recipe.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
                </View>
                <View style={styles.itemRight}>
                  {recipe.enhanced_json && (
                    <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>✨</Text></View>
                  )}
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  hero: { backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  heroGold: { height: 4, backgroundColor: Colors.gold, opacity: 0.5 },
  heroContent: { alignItems: 'center', padding: Spacing.xl, paddingTop: Spacing.lg },
  avatarRing: {
    width: 92, height: 92, borderRadius: 46, borderWidth: 2,
    borderColor: Colors.gold, padding: 3, marginBottom: Spacing.md, ...Shadow.md,
  },
  avatar: {
    flex: 1, borderRadius: 42, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 34, fontWeight: '800' },
  username: { fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: '700', color: Colors.primary },
  email: { ...Typography.caption, marginTop: 2 },
  ornamentRow: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.md, gap: Spacing.sm, width: '70%' },
  ornamentLine: { flex: 1, height: 1, backgroundColor: Colors.gold, opacity: 0.35 },
  ornamentDot: { color: Colors.gold, fontSize: 11 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl, marginBottom: Spacing.md },
  stat: { alignItems: 'center' },
  statValue: { fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: '700', color: Colors.primary },
  statLabel: { ...Typography.label, marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: Colors.divider },
  signOutBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  signOutText: { ...Typography.caption, color: Colors.textMuted },

  tabs: { flexDirection: 'row', backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.border },
  tab: { flex: 1, padding: Spacing.md, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.gold },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textLight },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },

  center: { padding: Spacing.xl, alignItems: 'center' },
  listSection: { padding: Spacing.md },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    borderWidth: 1.5, borderColor: Colors.primary + '50', borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.md, borderStyle: 'dashed',
    backgroundColor: Colors.primaryMuted,
  },
  addBtnText: { color: Colors.primary, fontWeight: '700', fontSize: 14 },

  tabEmpty: { alignItems: 'center', paddingVertical: Spacing.xxl, gap: Spacing.md },
  tabEmptyEmoji: { fontSize: 48 },
  tabEmptyText: { ...Typography.body, fontStyle: 'italic', textAlign: 'center' },

  itemCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
    overflow: 'hidden', ...Shadow.sm,
  },
  itemAccent: { height: 3, backgroundColor: Colors.gold, opacity: 0.45 },
  itemInner: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md },
  itemInfo: { flex: 1 },
  itemName: { fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: '700', color: Colors.primary },
  itemMeta: { ...Typography.caption, marginTop: 3 },
  itemActions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  itemRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  availBadge: { borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 4 },
  availText: { fontSize: 12, fontWeight: '700' },
  aiBadge: {
    backgroundColor: Colors.goldMuted, borderRadius: 4, borderWidth: 1,
    borderColor: Colors.gold + '40', paddingHorizontal: 6, paddingVertical: 2,
  },
  aiBadgeText: { fontSize: 12 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: Colors.primary, fontWeight: '700' },
});
