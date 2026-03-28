import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { Recipe, RecipeComment, EnhancedRecipe } from '../../types';

export default function RecipeDetailScreen({ route }: any) {
  const { recipe: initialRecipe, session }: { recipe: Recipe; session: any } = route.params;
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [comments, setComments] = useState<RecipeComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const enhanced = recipe.enhanced_json as EnhancedRecipe | null;

  useEffect(() => { loadComments(); }, []);

  async function loadComments() {
    const { data } = await supabase
      .from('recipe_comments').select('*, profiles(username)')
      .eq('recipe_id', recipe.id).order('created_at', { ascending: true });
    setComments((data ?? []) as RecipeComment[]);
  }

  async function handleLike() {
    if (!session) return;
    await supabase.from('recipes').update({ likes_count: recipe.likes_count + 1 }).eq('id', recipe.id);
    setRecipe(prev => ({ ...prev, likes_count: prev.likes_count + 1 }));
  }

  async function handleComment() {
    if (!newComment.trim() || !session) return;
    setSubmitting(true);
    const { data } = await supabase.from('recipe_comments').insert({
      recipe_id: recipe.id, author_id: session.user.id, content: newComment.trim(),
    }).select('*, profiles(username)').single();
    if (data) setComments(prev => [...prev, data as RecipeComment]);
    setNewComment('');
    setSubmitting(false);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {recipe.photo_urls && recipe.photo_urls.length > 0 ? (
          <Image source={{ uri: recipe.photo_urls[0] }} style={styles.hero} />
        ) : (
          <View style={styles.heroPlaceholder}>
            <Text style={styles.heroEmoji}>🍞</Text>
          </View>
        )}
        <View style={styles.goldStrip} />

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.titleBlock}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{recipe.title}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.author}>by {recipe.profiles?.username ?? 'Unknown Baker'}</Text>
              <TouchableOpacity style={styles.likeBtn} onPress={handleLike}>
                <Ionicons name="heart" size={18} color={Colors.rose} />
                <Text style={styles.likeCount}>{recipe.likes_count}</Text>
              </TouchableOpacity>
            </View>
            {enhanced && (
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>✨ AI Enhanced by OpenAI</Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          {enhanced?.description && (
            <Text style={styles.description}>{enhanced.description}</Text>
          )}

          {enhanced?.tags && enhanced.tags.length > 0 && (
            <View style={styles.tags}>
              {enhanced.tags.map((tag, i) => (
                <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
          )}

          {enhanced ? (
            <>
              {/* Ingredients */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Ingredients</Text>
                </View>
                {enhanced.ingredients.map((ing, i) => (
                  <View key={i} style={styles.ingredientRow}>
                    <View style={styles.ingredientBullet} />
                    <Text style={styles.ingredientText}>
                      <Text style={styles.ingredientAmount}>{ing.amount} {ing.unit} </Text>
                      {ing.item}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Method */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionAccent} />
                  <Text style={styles.sectionTitle}>Method</Text>
                </View>
                {enhanced.steps.map((step, i) => (
                  <View key={i} style={styles.stepCard}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{step.step_number}</Text>
                    </View>
                    <View style={styles.stepContent}>
                      <Text style={styles.stepInstruction}>{step.instruction}</Text>
                      {step.tip && (
                        <View style={styles.tipBox}>
                          <Ionicons name="bulb-outline" size={13} color={Colors.gold} />
                          <Text style={styles.tipText}>{step.tip}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>

              {recipe.original_text && (
                <TouchableOpacity style={styles.toggleOriginal} onPress={() => setShowOriginal(v => !v)}>
                  <Text style={styles.toggleOriginalText}>
                    {showOriginal ? '▲ Hide' : '▼ Show'} original recipe
                  </Text>
                </TouchableOpacity>
              )}
              {showOriginal && (
                <View style={styles.originalBox}>
                  <Text style={styles.originalText}>{recipe.original_text}</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.section}>
              <Text style={styles.originalText}>{recipe.original_text}</Text>
            </View>
          )}

          {/* Comments */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
            </View>
            {comments.map(comment => (
              <View key={comment.id} style={styles.commentCard}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>
                    {comment.profiles?.username?.[0]?.toUpperCase() ?? '?'}
                  </Text>
                </View>
                <View style={styles.commentBody}>
                  <Text style={styles.commentAuthor}>{comment.profiles?.username ?? 'Unknown'}</Text>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                </View>
              </View>
            ))}
            {session && (
              <View style={styles.commentInputRow}>
                <TextInput
                  style={styles.commentField}
                  value={newComment} onChangeText={setNewComment}
                  placeholder="Share your thoughts..."
                  placeholderTextColor={Colors.textMuted}
                  multiline
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleComment} disabled={submitting}>
                  {submitting
                    ? <ActivityIndicator size="small" color={Colors.white} />
                    : <Ionicons name="send" size={15} color={Colors.white} />}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { width: '100%', height: 300 },
  heroPlaceholder: {
    height: 200, backgroundColor: Colors.backgroundDeep, alignItems: 'center', justifyContent: 'center',
  },
  heroEmoji: { fontSize: 72 },
  goldStrip: { height: 4, backgroundColor: Colors.gold, opacity: 0.5 },
  content: { padding: Spacing.lg },

  titleBlock: { marginBottom: Spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  title: { fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: '700', color: Colors.primary, flex: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  author: { ...Typography.body, fontSize: 14, fontStyle: 'italic' },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  likeCount: { fontSize: 16, color: Colors.rose, fontWeight: '700' },
  aiBadge: {
    alignSelf: 'flex-start', marginTop: Spacing.sm,
    backgroundColor: Colors.goldMuted, borderRadius: Radius.sm, borderWidth: 1,
    borderColor: Colors.gold + '50', paddingHorizontal: Spacing.sm, paddingVertical: 4,
  },
  aiBadgeText: { color: Colors.gold, fontSize: 12, fontWeight: '700' },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: Spacing.md },
  description: { ...Typography.body, fontSize: 15, marginBottom: Spacing.md },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: Spacing.md },
  tag: {
    backgroundColor: Colors.primaryMuted, borderRadius: 4,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  tagText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },

  section: { marginTop: Spacing.lg },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md, gap: Spacing.sm },
  sectionAccent: { width: 4, height: 20, backgroundColor: Colors.gold, borderRadius: 2 },
  sectionTitle: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: '700', color: Colors.text },

  ingredientRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.sm },
  ingredientBullet: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.gold,
    marginTop: 8, marginRight: Spacing.sm, flexShrink: 0,
  },
  ingredientText: { ...Typography.body, fontSize: 15, flex: 1 },
  ingredientAmount: { fontWeight: '700', color: Colors.primary },

  stepCard: { flexDirection: 'row', marginBottom: Spacing.md },
  stepNumber: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md, marginTop: 2, flexShrink: 0,
  },
  stepNumberText: { color: Colors.white, fontSize: 13, fontWeight: '800' },
  stepContent: { flex: 1 },
  stepInstruction: { ...Typography.body, fontSize: 15 },
  tipBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    backgroundColor: Colors.goldMuted, borderRadius: Radius.sm,
    padding: Spacing.sm, marginTop: Spacing.sm,
    borderLeftWidth: 3, borderLeftColor: Colors.gold,
  },
  tipText: { fontSize: 13, color: Colors.textSecondary, flex: 1, lineHeight: 18 },

  toggleOriginal: { marginTop: Spacing.md, alignSelf: 'flex-start' },
  toggleOriginalText: { color: Colors.textMuted, fontSize: 13 },
  originalBox: {
    backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md,
    marginTop: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  originalText: { ...Typography.body, fontSize: 14 },

  commentCard: {
    flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border, ...Shadow.sm,
  },
  commentAvatar: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm, flexShrink: 0,
  },
  commentAvatarText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
  commentBody: { flex: 1 },
  commentAuthor: { fontSize: 13, fontWeight: '700', color: Colors.primary, marginBottom: 3 },
  commentContent: { ...Typography.body, fontSize: 14 },
  commentInputRow: {
    flexDirection: 'row', alignItems: 'flex-end', marginTop: Spacing.md,
    backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.sm,
    borderWidth: 1, borderColor: Colors.border, ...Shadow.sm, gap: Spacing.sm,
  },
  commentField: {
    flex: 1, fontSize: 14, color: Colors.text, maxHeight: 80,
    padding: Spacing.xs, fontFamily: 'Georgia, serif',
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
});
