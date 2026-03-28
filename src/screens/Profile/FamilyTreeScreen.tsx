import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';
import { StarterLineage, Starter } from '../../types';

interface TreeNode {
  starter: Starter;
  children: TreeNode[];
  depth: number;
}

function buildTree(
  starterId: string,
  startersMap: Map<string, Starter>,
  lineages: StarterLineage[],
  depth = 0,
  visited = new Set<string>()
): TreeNode | null {
  if (visited.has(starterId)) return null;
  visited.add(starterId);
  const starter = startersMap.get(starterId);
  if (!starter) return null;
  const children = lineages
    .filter(l => l.parent_starter_id === starterId)
    .map(l => buildTree(l.child_starter_id, startersMap, lineages, depth + 1, new Set(visited)))
    .filter(Boolean) as TreeNode[];
  return { starter, children, depth };
}

function countDescendants(node: TreeNode): number {
  return node.children.reduce((acc, c) => acc + 1 + countDescendants(c), 0);
}

function TreeNodeView({ node, onPress }: { node: TreeNode; onPress: (s: Starter) => void }) {
  const descendants = countDescendants(node);
  return (
    <View style={[treeStyles.nodeWrapper, { marginLeft: node.depth * 28 }]}>
      <View style={treeStyles.nodeRow}>
        {node.depth > 0 && (
          <View style={treeStyles.connectorBox}>
            <View style={treeStyles.connectorH} />
          </View>
        )}
        <TouchableOpacity style={treeStyles.nodeCard} onPress={() => onPress(node.starter)} activeOpacity={0.8}>
          <View style={treeStyles.nodeAccent} />
          <View style={treeStyles.nodeContent}>
            <Text style={treeStyles.nodeName}>{node.starter.name}</Text>
            <Text style={treeStyles.nodeOwner}>by {(node.starter as any).profiles?.username ?? 'Unknown'}</Text>
            {descendants > 0 && (
              <View style={treeStyles.descendantBadge}>
                <Ionicons name="git-branch-outline" size={10} color={Colors.accent} />
                <Text style={treeStyles.descendantText}>{descendants} descendant{descendants > 1 ? 's' : ''}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {node.children.map((child, i) => (
        <TreeNodeView key={child.starter.id} node={child} onPress={onPress} />
      ))}
    </View>
  );
}

const treeStyles = StyleSheet.create({
  nodeWrapper: { marginVertical: 4 },
  nodeRow: { flexDirection: 'row', alignItems: 'center' },
  connectorBox: { width: 20, justifyContent: 'center', marginRight: 4 },
  connectorH: { height: 2, backgroundColor: Colors.gold, opacity: 0.4 },
  nodeCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border, overflow: 'hidden',
    flexDirection: 'row', ...Shadow.sm, minWidth: 170,
  },
  nodeAccent: { width: 4, backgroundColor: Colors.primary, opacity: 0.6 },
  nodeContent: { padding: Spacing.sm, flex: 1 },
  nodeName: { fontFamily: 'Georgia, serif', fontSize: 14, fontWeight: '700', color: Colors.primary },
  nodeOwner: { ...Typography.caption, marginTop: 2 },
  descendantBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  descendantText: { fontSize: 10, color: Colors.accent, fontWeight: '600' },
});

export default function FamilyTreeScreen({ route, navigation }: any) {
  const { starterId, session } = route.params;
  const [loading, setLoading] = useState(true);
  const [rootNode, setRootNode] = useState<TreeNode | null>(null);
  const [lineageText, setLineageText] = useState('');

  useEffect(() => { loadFamilyTree(); }, [starterId]);

  async function loadFamilyTree() {
    setLoading(true);
    const { data: lineages } = await supabase.from('starter_lineage').select('*');

    if (!lineages || lineages.length === 0) {
      const { data: starter } = await supabase.from('starters').select('*, profiles(username)').eq('id', starterId).single();
      if (starter) setRootNode({ starter, children: [], depth: 0 });
      setLoading(false);
      return;
    }

    let rootId = starterId;
    let currentId = starterId;
    for (let i = 0; i < 20; i++) {
      const parent = lineages.find((l: StarterLineage) => l.child_starter_id === currentId);
      if (!parent) break;
      currentId = parent.parent_starter_id;
      rootId = currentId;
    }

    const starterIds = new Set<string>([rootId]);
    lineages.forEach((l: StarterLineage) => { starterIds.add(l.parent_starter_id); starterIds.add(l.child_starter_id); });

    const { data: starters } = await supabase.from('starters').select('*, profiles(username)').in('id', Array.from(starterIds));
    const startersMap = new Map((starters ?? []).map(s => [s.id, s]));
    const tree = buildTree(rootId, startersMap, lineages as StarterLineage[]);

    if (tree) {
      setRootNode(tree);
      const ancestors: string[] = [];
      let id = starterId;
      for (let depth = 0; depth < 10; depth++) {
        const parentLineage = lineages.find((l: StarterLineage) => l.child_starter_id === id);
        if (!parentLineage) break;
        const parentStarter = startersMap.get(parentLineage.parent_starter_id);
        if (parentStarter) ancestors.push((parentStarter as any).profiles?.username ?? 'Unknown');
        id = parentLineage.parent_starter_id;
      }
      if (ancestors.length > 0) {
        setLineageText(`Descends from ${ancestors[ancestors.length - 1]}'s starter · shared ${ancestors.length} time${ancestors.length > 1 ? 's' : ''}`);
      }
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Tracing lineage...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Family Tree</Text>
        <Text style={styles.subtitle}>The living history of this culture</Text>
        <View style={styles.ornamentRow}>
          <View style={styles.ornamentLine} />
          <Text style={styles.ornamentDot}>✦</Text>
          <View style={styles.ornamentLine} />
        </View>
      </View>

      {lineageText ? (
        <View style={styles.lineageBanner}>
          <Ionicons name="git-network-outline" size={16} color={Colors.accent} />
          <Text style={styles.lineageBannerText}>{lineageText}</Text>
        </View>
      ) : null}

      {!rootNode ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🌱</Text>
          <Text style={styles.emptyTitle}>No lineage recorded yet</Text>
          <Text style={styles.emptySubtitle}>Share this starter to begin building its family tree</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.treeContainer}>
            <TreeNodeView node={rootNode} onPress={s => navigation.navigate('StarterDetail', { starter: s, session })} />
          </View>
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  loadingText: { ...Typography.caption, letterSpacing: 1 },

  titleBlock: { marginBottom: Spacing.lg },
  title: { fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: '700', color: Colors.primary },
  subtitle: { ...Typography.body, fontSize: 14, marginTop: 4, fontStyle: 'italic' },
  ornamentRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.md, gap: Spacing.sm },
  ornamentLine: { flex: 1, height: 1, backgroundColor: Colors.gold, opacity: 0.35 },
  ornamentDot: { color: Colors.gold, fontSize: 11 },

  lineageBanner: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.accentMuted, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.lg,
    borderWidth: 1, borderColor: Colors.accent + '30',
    borderLeftWidth: 3, borderLeftColor: Colors.accent,
  },
  lineageBannerText: { color: Colors.accent, fontSize: 14, fontWeight: '600', flex: 1 },

  treeContainer: { minWidth: '100%', paddingRight: Spacing.xl },

  empty: { alignItems: 'center', paddingTop: Spacing.xxl, gap: Spacing.md },
  emptyEmoji: { fontSize: 52 },
  emptyTitle: { fontFamily: 'Georgia, serif', fontSize: 20, color: Colors.primary, fontWeight: '700' },
  emptySubtitle: { ...Typography.body, textAlign: 'center' },
});
