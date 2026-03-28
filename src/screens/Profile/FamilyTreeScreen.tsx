import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { supabase } from '../../../lib/supabase';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';
import { StarterLineage, Starter } from '../../types';

interface TreeNode {
  starter: Starter;
  children: TreeNode[];
  depth: number;
  lineageCount: number;
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
  return { starter, children, depth, lineageCount: children.reduce((acc, c) => acc + c.lineageCount + 1, 0) };
}

function countDescendants(node: TreeNode): number {
  return node.children.reduce((acc, c) => acc + 1 + countDescendants(c), 0);
}

function TreeNodeView({ node, onPress }: { node: TreeNode; onPress: (s: Starter) => void }) {
  return (
    <View style={[styles.nodeContainer, { marginLeft: node.depth * 24 }]}>
      <View style={styles.nodeRow}>
        {node.depth > 0 && <View style={styles.connector} />}
        <TouchableOpacity style={styles.nodeCard} onPress={() => onPress(node.starter)} activeOpacity={0.8}>
          <Text style={styles.nodeName}>{node.starter.name}</Text>
          <Text style={styles.nodeOwner}>by {(node.starter as any).profiles?.username ?? 'Unknown'}</Text>
          {node.children.length > 0 && (
            <Text style={styles.nodeChildren}>{countDescendants(node)} descendants</Text>
          )}
        </TouchableOpacity>
      </View>
      {node.children.map(child => (
        <TreeNodeView key={child.starter.id} node={child} onPress={onPress} />
      ))}
    </View>
  );
}

export default function FamilyTreeScreen({ route, navigation }: any) {
  const { starterId, session } = route.params;
  const [loading, setLoading] = useState(true);
  const [rootNode, setRootNode] = useState<TreeNode | null>(null);
  const [lineageText, setLineageText] = useState('');
  const [allLineages, setAllLineages] = useState<StarterLineage[]>([]);

  useEffect(() => { loadFamilyTree(); }, [starterId]);

  async function loadFamilyTree() {
    setLoading(true);

    // Get all lineages to build the full tree
    const { data: lineages } = await supabase
      .from('starter_lineage')
      .select('*');

    if (!lineages || lineages.length === 0) {
      // Just load the single starter
      const { data: starter } = await supabase
        .from('starters')
        .select('*, profiles(username)')
        .eq('id', starterId)
        .single();
      if (starter) {
        setRootNode({ starter, children: [], depth: 0, lineageCount: 0 });
      }
      setLoading(false);
      return;
    }

    // Find root ancestor
    const childIds = new Set(lineages.map((l: StarterLineage) => l.child_starter_id));
    let rootId = starterId;
    // Walk up to find root
    let currentId = starterId;
    for (let i = 0; i < 20; i++) {
      const parent = lineages.find((l: StarterLineage) => l.child_starter_id === currentId);
      if (!parent) break;
      currentId = parent.parent_starter_id;
      rootId = currentId;
    }

    // Get all relevant starter IDs
    const starterIds = new Set<string>([rootId]);
    lineages.forEach((l: StarterLineage) => { starterIds.add(l.parent_starter_id); starterIds.add(l.child_starter_id); });

    const { data: starters } = await supabase
      .from('starters')
      .select('*, profiles(username)')
      .in('id', Array.from(starterIds));

    const startersMap = new Map((starters ?? []).map(s => [s.id, s]));
    const tree = buildTree(rootId, startersMap, lineages as StarterLineage[]);

    if (tree) {
      setRootNode(tree);
      // Build lineage text for current starter
      const ancestors: string[] = [];
      let id = starterId;
      let depth = 0;
      while (depth < 10) {
        const parentLineage = lineages.find((l: StarterLineage) => l.child_starter_id === id);
        if (!parentLineage) break;
        const parentStarter = startersMap.get(parentLineage.parent_starter_id);
        if (parentStarter) ancestors.push((parentStarter as any).profiles?.username ?? 'Unknown');
        id = parentLineage.parent_starter_id;
        depth++;
      }
      if (ancestors.length > 0) {
        setLineageText(`This starter descends from ${ancestors[ancestors.length - 1]}'s starter, shared ${ancestors.length} time${ancestors.length > 1 ? 's' : ''}`);
      }
    }

    setAllLineages(lineages as StarterLineage[]);
    setLoading(false);
  }

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={Colors.primary} /></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Family Tree</Text>

      {lineageText ? (
        <View style={styles.lineageBanner}>
          <Text style={styles.lineageBannerText}>🌿 {lineageText}</Text>
        </View>
      ) : null}

      {!rootNode ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🌱</Text>
          <Text style={styles.emptyText}>No lineage data yet</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.treeWrapper}>
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.md },
  lineageBanner: {
    backgroundColor: Colors.accent + '20', borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.lg, borderLeftWidth: 3, borderLeftColor: Colors.accent,
  },
  lineageBannerText: { color: Colors.accent, fontSize: 14, fontWeight: '600' },
  treeWrapper: { minWidth: '100%' },
  nodeContainer: { marginVertical: 4 },
  nodeRow: { flexDirection: 'row', alignItems: 'center' },
  connector: {
    width: 16, height: 2, backgroundColor: Colors.border, marginRight: 8,
  },
  nodeCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    borderLeftWidth: 3, borderLeftColor: Colors.primary, ...Shadow.sm,
    minWidth: 160,
  },
  nodeName: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  nodeOwner: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  nodeChildren: { fontSize: 11, color: Colors.accent, marginTop: 4 },
  empty: { alignItems: 'center', paddingTop: Spacing.xxl },
  emptyEmoji: { fontSize: 48, marginBottom: Spacing.md },
  emptyText: { color: Colors.textSecondary, fontSize: 16 },
});
