import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { Recipe } from '../../types';

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

  function renderRecipe({ item }: { item: Recipe }) {
    const photo = item.photo_urls?.[0];
    const enhanced = item.enhanced_json;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item, session })}
        activeOpacity={0.8}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.cardPhoto} />
        ) : (
          <View style={styles.cardPhotoPlaceholder}>
            <Text style={styles.cardPhotoEmoji}>🍞</Text>
          </View>
        )}
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
            {enhanced && (
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>✨ AI</Text>
              </View>
            )}
          </View>
          {enhanced?.description && (
            <Text style={styles.cardDesc} numberOfLines={2}>{enhanced.description}</Text>
          )}
          <View style={styles.cardFooter}>
            <Text style={styles.cardAuthor}>by {item.profiles?.username ?? 'Unknown'}</Text>
            <TouchableOpacity style={styles.likeBtn} onPress={() => handleLike(item)}>
              <Ionicons name="heart-outline" size={16} color={Colors.primary} />
              <Text style={styles.likeCount}>{item.likes_count}</Text>
            </TouchableOpacity>
          </View>
          {enhanced?.tags && enhanced.tags.length > 0 && (
            <View style={styles.tags}>
              {enhanced.tags.slice(0, 3).map((tag, i) => (
                <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Recipes</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('SubmitRecipe', { session })}>
          <Ionicons name="add" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>
      ) : recipes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🍞</Text>
          <Text style={styles.emptyTitle}>No recipes yet</Text>
          <Text style={styles.emptySubtitle}>Share your first sourdough recipe with the community!</Text>
          <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('SubmitRecipe', { session })}>
            <Text style={styles.emptyBtnText}>Share Recipe</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={item => item.id}
          renderItem={renderRecipe}
          contentContainerStyle={{ paddingVertical: Spacing.sm }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: Spacing.md, paddingTop: Spacing.lg, backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  addBtn: {
    width: 36, height: 36, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.md,
    marginHorizontal: Spacing.md, marginVertical: Spacing.xs,
    overflow: 'hidden', ...Shadow.sm,
  },
  cardPhoto: { width: '100%', height: 180 },
  cardPhotoPlaceholder: {
    height: 100, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center',
  },
  cardPhotoEmoji: { fontSize: 40 },
  cardContent: { padding: Spacing.md },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  cardTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, flex: 1, marginRight: Spacing.sm },
  aiBadge: {
    backgroundColor: Colors.primary + '15', borderRadius: Radius.sm,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  aiBadgeText: { color: Colors.primary, fontSize: 11, fontWeight: '700' },
  cardDesc: { fontSize: 13, color: Colors.textSecondary, marginTop: 4, lineHeight: 18 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.sm },
  cardAuthor: { fontSize: 12, color: Colors.textLight },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeCount: { fontSize: 13, color: Colors.primary },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.xs, gap: 4 },
  tag: { backgroundColor: Colors.background, borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 11, color: Colors.textSecondary },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.md },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  emptySubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.lg },
  emptyBtn: { backgroundColor: Colors.primary, borderRadius: Radius.md, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md },
  emptyBtnText: { color: Colors.white, fontWeight: '700' },
});
