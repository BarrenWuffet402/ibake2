import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { Recipe } from '../../types';
import ScreenHeader from '../../components/ScreenHeader';

export default function RecipesScreen({ navigation, route }: any) {
  const session = route.params?.session;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => { loadRecipes(); }, []));

  async function loadRecipes() {
    setLoading(true);
    const { data } = await supabase
      .from('recipes')
      .select('*, profiles(username, avatar_url)')
      .order('created_at', { ascending: false });
    setRecipes((data ?? []) as Recipe[]);
    setLoading(false);
  }

  async function handleLike(recipe: Recipe) {
    if (!session) return;
    await supabase.from('recipes').update({ likes_count: recipe.likes_count + 1 }).eq('id', recipe.id);
    setRecipes(prev => prev.map(r => r.id === recipe.id ? { ...r, likes_count: r.likes_count + 1 } : r));
  }

  function renderRecipe({ item, index }: { item: Recipe; index: number }) {
    const photo = item.photo_urls?.[0];
    const enhanced = item.enhanced_json;
    const isFeature = index === 0;

    return (
      <TouchableOpacity
        style={[styles.card, isFeature && styles.cardFeature]}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item, session })}
        activeOpacity={0.85}>
        <View style={styles.cardAccent} />
        {photo ? (
          <Image source={{ uri: photo }} style={[styles.cardPhoto, isFeature && styles.cardPhotoFeature]} />
        ) : (
          <View style={[styles.cardPhotoPlaceholder, isFeature && styles.cardPhotoFeature]}>
            <Text style={styles.cardPhotoEmoji}>🍞</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardTitle, isFeature && styles.cardTitleFeature]} numberOfLines={2}>
              {item.title}
            </Text>
            {enhanced && (
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>✨ AI</Text>
              </View>
            )}
          </View>
          {enhanced?.description && (
            <Text style={styles.cardDesc} numberOfLines={isFeature ? 3 : 2}>{enhanced.description}</Text>
          )}
          {enhanced?.tags && enhanced.tags.length > 0 && (
            <View style={styles.tags}>
              {enhanced.tags.slice(0, 3).map((tag, i) => (
                <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
          )}
          <View style={styles.cardFooter}>
            <Text style={styles.cardAuthor}>by {item.profiles?.username ?? 'Unknown'}</Text>
            <TouchableOpacity style={styles.likeBtn} onPress={() => handleLike(item)}>
              <Ionicons name="heart" size={14} color={Colors.rose} />
              <Text style={styles.likeCount}>{item.likes_count}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Community Recipes"
        subtitle="Crafted & shared by bakers"
        ornament="✦ Discover"
        rightIcon="add"
        rightLabel="Share"
        onRightPress={() => navigation.navigate('SubmitRecipe', { session })}
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Gathering recipes...</Text>
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🍞</Text>
          <Text style={styles.emptyTitle}>No recipes yet</Text>
          <Text style={styles.emptySubtitle}>Be the first to share a sourdough recipe with the community</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('SubmitRecipe', { session })}>
            <Text style={styles.emptyBtnText}>Share a Recipe</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={item => item.id}
          renderItem={renderRecipe}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  loadingText: { ...Typography.caption, letterSpacing: 1 },
  list: { paddingVertical: Spacing.sm, paddingBottom: 32 },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  cardFeature: { ...Shadow.md },
  cardAccent: { height: 3, backgroundColor: Colors.gold, opacity: 0.5 },
  cardPhoto: { width: '100%', height: 200 },
  cardPhotoFeature: { height: 240 },
  cardPhotoPlaceholder: {
    height: 120, backgroundColor: Colors.backgroundDeep,
    alignItems: 'center', justifyContent: 'center',
  },
  cardPhotoEmoji: { fontSize: 48 },
  cardContent: { padding: Spacing.md },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardTitle: {
    fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: '700',
    color: Colors.primary, flex: 1, marginRight: Spacing.sm,
  },
  cardTitleFeature: { fontSize: 20 },
  aiBadge: {
    backgroundColor: Colors.goldMuted, borderRadius: 4, borderWidth: 1,
    borderColor: Colors.gold + '40', paddingHorizontal: 6, paddingVertical: 2,
  },
  aiBadgeText: { color: Colors.gold, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  cardDesc: { ...Typography.body, fontSize: 13, marginTop: 6 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.sm, gap: 4 },
  tag: {
    backgroundColor: Colors.primaryMuted, borderRadius: 4,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  tagText: { fontSize: 10, color: Colors.primary, fontWeight: '600' },
  cardFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.borderLight,
  },
  cardAuthor: { ...Typography.caption, fontStyle: 'italic' },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeCount: { fontSize: 13, color: Colors.rose, fontWeight: '600' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontFamily: 'Georgia, serif', fontSize: 22, color: Colors.primary, fontWeight: '700', marginBottom: Spacing.sm },
  emptySubtitle: { ...Typography.body, textAlign: 'center', marginBottom: Spacing.lg },
  emptyBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, ...Shadow.sm,
  },
  emptyBtnText: { color: Colors.white, fontWeight: '700', letterSpacing: 0.5 },
});
