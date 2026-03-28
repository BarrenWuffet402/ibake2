import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
  ScrollView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
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
      .from('recipe_comments')
      .select('*, profiles(username)')
      .eq('recipe_id', recipe.id)
      .order('created_at', { ascending: true });
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
      recipe_id: recipe.id,
      author_id: session.user.id,
      content: newComment.trim(),
    }).select('*, profiles(username)').single();
    if (data) setComments(prev => [...prev, data as RecipeComment]);
    setNewComment('');
    setSubmitting(false);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {recipe.photo_urls && recipe.photo_urls.length > 0 && (
          <Image source={{ uri: recipe.photo_urls[0] }} style={styles.hero} />
        )}

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{recipe.title}</Text>
            {enhanced && (
              <View style={styles.aiBadge}>
                <Text style={styles.aiBadgeText}>✨ AI Enhanced</Text>
              </View>
            )}
          </View>

          <View style={styles.meta}>
            <Text style={styles.author}>by {recipe.profiles?.username ?? 'Unknown'}</Text>
            <TouchableOpacity style={styles.likeBtn} onPress={handleLike}>
              <Ionicons name="heart" size={18} color={Colors.primary} />
              <Text style={styles.likeCount}>{recipe.likes_count}</Text>
            </TouchableOpacity>
          </View>

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
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {enhanced.ingredients.map((ing, i) => (
                  <View key={i} style={styles.ingredientRow}>
                    <View style={styles.bullet} />
                    <Text style={styles.ingredientText}>
                      <Text style={styles.ingredientAmount}>{ing.amount} {ing.unit} </Text>
                      {ing.item}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Method</Text>
                {enhanced.steps.map((step, i) => (
                  <View key={i} style={styles.stepCard}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{step.step_number}</Text>
                    </View>
                    <View style={styles.stepContent}>
                      <Text style={styles.stepInstruction}>{step.instruction}</Text>
                      {step.tip && (
                        <View style={styles.tipBox}>
                          <Text style={styles.tipText}>💡 {step.tip}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>

              {recipe.original_text && (
                <TouchableOpacity onPress={() => setShowOriginal(v => !v)} style={styles.toggleOriginal}>
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

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
            {comments.map(comment => (
              <View key={comment.id} style={styles.commentCard}>
                <Text style={styles.commentAuthor}>{comment.profiles?.username ?? 'Unknown'}</Text>
                <Text style={styles.commentContent}>{comment.content}</Text>
              </View>
            ))}
            {session && (
              <View style={styles.commentInput}>
                <TextInput
                  style={styles.commentField}
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder="Add a comment..."
                  placeholderTextColor={Colors.textLight}
                  multiline
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleComment} disabled={submitting}>
                  {submitting ? <ActivityIndicator size="small" color={Colors.white} /> :
                    <Ionicons name="send" size={16} color={Colors.white} />}
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
  hero: { width: '100%', height: 260 },
  content: { padding: Spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: { fontSize: 24, fontWeight: '800', color: Colors.primary, flex: 1, marginRight: Spacing.sm },
  aiBadge: {
    backgroundColor: Colors.primary + '15', borderRadius: Radius.sm,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  aiBadgeText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: Spacing.sm },
  author: { fontSize: 13, color: Colors.textLight },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeCount: { fontSize: 15, color: Colors.primary, fontWeight: '600' },
  description: { fontSize: 15, color: Colors.textSecondary, marginTop: Spacing.md, lineHeight: 22 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.sm, gap: 4 },
  tag: { backgroundColor: Colors.background, borderRadius: Radius.sm, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 12, color: Colors.textSecondary },
  section: { marginTop: Spacing.xl },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: Spacing.md },
  ingredientRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.sm },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary, marginTop: 7, marginRight: Spacing.sm },
  ingredientText: { fontSize: 15, color: Colors.text, flex: 1 },
  ingredientAmount: { fontWeight: '600', color: Colors.primary },
  stepCard: { flexDirection: 'row', marginBottom: Spacing.md },
  stepNumber: {
    width: 28, height: 28, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md, marginTop: 2, flexShrink: 0,
  },
  stepNumberText: { color: Colors.white, fontSize: 13, fontWeight: '800' },
  stepContent: { flex: 1 },
  stepInstruction: { fontSize: 15, color: Colors.text, lineHeight: 22 },
  tipBox: {
    backgroundColor: Colors.accent + '15', borderRadius: Radius.sm,
    padding: Spacing.sm, marginTop: Spacing.sm, borderLeftWidth: 3, borderLeftColor: Colors.accent,
  },
  tipText: { fontSize: 13, color: Colors.accent, lineHeight: 18 },
  toggleOriginal: { marginTop: Spacing.md },
  toggleOriginalText: { color: Colors.textLight, fontSize: 13 },
  originalBox: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    marginTop: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  originalText: { fontSize: 14, color: Colors.textSecondary, lineHeight: 21 },
  commentCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    marginBottom: Spacing.sm, ...Shadow.sm,
  },
  commentAuthor: { fontSize: 13, fontWeight: '700', color: Colors.primary, marginBottom: 2 },
  commentContent: { fontSize: 14, color: Colors.text },
  commentInput: {
    flexDirection: 'row', alignItems: 'flex-end', marginTop: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.sm,
    ...Shadow.sm,
  },
  commentField: { flex: 1, fontSize: 14, color: Colors.text, maxHeight: 80, padding: Spacing.xs },
  sendBtn: {
    width: 36, height: 36, borderRadius: Radius.full, backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center', marginLeft: Spacing.sm,
  },
});
