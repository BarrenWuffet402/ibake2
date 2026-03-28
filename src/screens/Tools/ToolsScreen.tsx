import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow, Typography } from '../../constants/theme';

function SectionHeader({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <View style={sectionStyles.header}>
      <View style={sectionStyles.emojiBox}><Text style={sectionStyles.emoji}>{emoji}</Text></View>
      <View>
        <Text style={sectionStyles.title}>{title}</Text>
        <Text style={sectionStyles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  emojiBox: {
    width: 48, height: 48, borderRadius: Radius.md, backgroundColor: Colors.goldMuted,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.gold + '40',
  },
  emoji: { fontSize: 24 },
  title: { fontFamily: 'Georgia, serif', fontSize: 17, fontWeight: '700', color: Colors.primary },
  subtitle: { ...Typography.caption, marginTop: 1 },
});

// ─────────────────────────────────────────────────────
// A) Proofing Time Calculator
// ─────────────────────────────────────────────────────
function ProofingCalculator() {
  const [temp, setTemp] = useState('24');
  const [proofLevel, setProofLevel] = useState<'under' | 'perfect' | 'over'>('perfect');
  const [starterPct, setStarterPct] = useState('20');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const t = parseFloat(temp);
    const s = parseFloat(starterPct);
    if (isNaN(t) || isNaN(s) || s <= 0) { setResult('Please enter valid values'); return; }
    let hours = 4;
    hours += (24 - t) * 0.5;
    hours += (20 - s) / 5 * 0.25;
    if (proofLevel === 'under') hours *= 0.75;
    else if (proofLevel === 'over') hours *= 1.3;
    hours = Math.max(0.5, hours);
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    setResult(`${h}h${m > 0 ? ` ${m}min` : ''}`);
  }

  const levels: Array<{ key: 'under' | 'perfect' | 'over'; label: string; desc: string }> = [
    { key: 'under', label: 'Under', desc: 'More spring' },
    { key: 'perfect', label: 'Perfect', desc: 'Balanced' },
    { key: 'over', label: 'Over', desc: 'Open crumb' },
  ];

  return (
    <View style={styles.card}>
      <SectionHeader emoji="⏱️" title="Proofing Time" subtitle="Find the perfect fermentation window" />
      <View style={styles.divider} />

      <Text style={styles.label}>Dough Temperature (°C)</Text>
      <TextInput style={styles.input} value={temp} onChangeText={setTemp} keyboardType="decimal-pad" placeholder="24" placeholderTextColor={Colors.textMuted} />

      <Text style={styles.label}>Desired Proof Level</Text>
      <View style={styles.toggleRow}>
        {levels.map(l => (
          <TouchableOpacity key={l.key} style={[styles.toggleBtn, proofLevel === l.key && styles.toggleBtnActive]} onPress={() => setProofLevel(l.key)} activeOpacity={0.8}>
            <Text style={[styles.toggleBtnText, proofLevel === l.key && styles.toggleBtnTextActive]}>{l.label}</Text>
            <Text style={[styles.toggleBtnDesc, proofLevel === l.key && styles.toggleBtnDescActive]}>{l.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Starter % of Flour</Text>
      <TextInput style={styles.input} value={starterPct} onChangeText={setStarterPct} keyboardType="decimal-pad" placeholder="20" placeholderTextColor={Colors.textMuted} />

      <TouchableOpacity style={styles.calcBtn} onPress={calculate} activeOpacity={0.85}>
        <Text style={styles.calcBtnText}>Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Estimated Proofing Time</Text>
          <Text style={styles.resultValue}>{result}</Text>
          <Text style={styles.resultHint}>At {temp}°C with {starterPct}% starter</Text>
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────
// B) Starter / Yeast Ratio
// ─────────────────────────────────────────────────────
function RatioCalculator() {
  const [flour, setFlour] = useState('500');
  const [result, setResult] = useState<{ starter: string; yeast: string } | null>(null);

  function calculate() {
    const f = parseFloat(flour);
    if (isNaN(f) || f <= 0) return;
    const starterMin = Math.round(f * 0.15);
    const starterMax = Math.round(f * 0.20);
    const yeast = (f * 0.003).toFixed(1);
    setResult({ starter: `${starterMin}–${starterMax}g`, yeast: `${yeast}g` });
  }

  return (
    <View style={styles.card}>
      <SectionHeader emoji="⚖️" title="Starter / Yeast Ratio" subtitle="How much leavening do you need?" />
      <View style={styles.divider} />

      <Text style={styles.label}>Flour Weight (g)</Text>
      <TextInput style={styles.input} value={flour} onChangeText={setFlour} keyboardType="decimal-pad" placeholder="500" placeholderTextColor={Colors.textMuted} />

      <TouchableOpacity style={styles.calcBtn} onPress={calculate} activeOpacity={0.85}>
        <Text style={styles.calcBtnText}>Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.ratioResults}>
          <View style={[styles.ratioCard, { borderTopColor: Colors.accent }]}>
            <Text style={styles.ratioEmoji}>🌾</Text>
            <Text style={styles.ratioType}>Sourdough Starter</Text>
            <Text style={styles.ratioValue}>{result.starter}</Text>
            <Text style={styles.ratioDesc}>15–20% of flour</Text>
          </View>
          <View style={styles.ratioSep}>
            <Text style={styles.ratioOr}>or</Text>
          </View>
          <View style={[styles.ratioCard, { borderTopColor: Colors.rose }]}>
            <Text style={styles.ratioEmoji}>🍃</Text>
            <Text style={styles.ratioType}>Active Dry Yeast</Text>
            <Text style={styles.ratioValue}>{result.yeast}</Text>
            <Text style={styles.ratioDesc}>0.3% of flour</Text>
          </View>
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────
// C) Reverse Recipe Calculator
// ─────────────────────────────────────────────────────
function ReverseCalculator() {
  const [loafWeight, setLoafWeight] = useState('900');
  const [hydration, setHydration] = useState('75');
  const [result, setResult] = useState<{ flour: number; water: number; salt: number; starter: number } | null>(null);

  function calculate() {
    const w = parseFloat(loafWeight);
    const h = parseFloat(hydration) / 100;
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
    const flour = Math.round(w / (1 + h + 0.02 + 0.2));
    setResult({ flour, water: Math.round(flour * h), salt: Math.round(flour * 0.02), starter: Math.round(flour * 0.2) });
  }

  const items = result ? [
    { label: 'Flour', value: result.flour, unit: 'g', color: Colors.primary, emoji: '🌾' },
    { label: 'Water', value: result.water, unit: 'g', color: '#5B8DB8', emoji: '💧' },
    { label: 'Salt', value: result.salt, unit: 'g', color: Colors.textSecondary, emoji: '🧂' },
    { label: 'Starter', value: result.starter, unit: 'g', color: Colors.accent, emoji: '🫙' },
  ] : [];

  return (
    <View style={styles.card}>
      <SectionHeader emoji="🔢" title="Reverse Recipe" subtitle="Work backwards from your target loaf" />
      <View style={styles.divider} />

      <Text style={styles.label}>Target Loaf Weight (g)</Text>
      <TextInput style={styles.input} value={loafWeight} onChangeText={setLoafWeight} keyboardType="decimal-pad" placeholder="900" placeholderTextColor={Colors.textMuted} />

      <Text style={styles.label}>Target Hydration (%)</Text>
      <TextInput style={styles.input} value={hydration} onChangeText={setHydration} keyboardType="decimal-pad" placeholder="75" placeholderTextColor={Colors.textMuted} />

      <TouchableOpacity style={styles.calcBtn} onPress={calculate} activeOpacity={0.85}>
        <Text style={styles.calcBtnText}>Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.reverseResults}>
          {items.map(item => (
            <View key={item.label} style={[styles.reverseRow, { borderLeftColor: item.color }]}>
              <Text style={styles.reverseEmoji}>{item.emoji}</Text>
              <Text style={styles.reverseLabel}>{item.label}</Text>
              <Text style={[styles.reverseValue, { color: item.color }]}>{item.value}{item.unit}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function ToolsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.pageHeader}>
        <View style={styles.ornamentRow}>
          <View style={styles.ornamentLine} />
          <Text style={styles.ornamentText}>✦</Text>
          <View style={styles.ornamentLine} />
        </View>
        <Text style={styles.pageTitle}>Baker's Toolkit</Text>
        <Text style={styles.pageSubtitle}>Precision tools for the craft</Text>
      </View>
      <ProofingCalculator />
      <RatioCalculator />
      <ReverseCalculator />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  pageHeader: { alignItems: 'center', paddingVertical: Spacing.lg },
  ornamentRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, width: '60%', marginBottom: Spacing.sm },
  ornamentLine: { flex: 1, height: 1, backgroundColor: Colors.gold, opacity: 0.4 },
  ornamentText: { color: Colors.gold, fontSize: 12 },
  pageTitle: { fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: '700', color: Colors.primary },
  pageSubtitle: { ...Typography.caption, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4 },

  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.lg,
    marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border, ...Shadow.sm,
  },
  divider: { height: 1, backgroundColor: Colors.divider, marginBottom: Spacing.md },
  label: { ...Typography.label, marginBottom: Spacing.xs, marginTop: Spacing.md },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 15, color: Colors.text,
    backgroundColor: Colors.background, fontFamily: 'Georgia, serif',
  },
  toggleRow: { flexDirection: 'row', gap: Spacing.sm },
  toggleBtn: {
    flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.sm, alignItems: 'center', backgroundColor: Colors.background,
  },
  toggleBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryMuted },
  toggleBtnText: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  toggleBtnTextActive: { color: Colors.primary },
  toggleBtnDesc: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  toggleBtnDescActive: { color: Colors.primaryLight },
  calcBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', marginTop: Spacing.lg, ...Shadow.sm,
  },
  calcBtnText: { color: Colors.white, fontWeight: '700', fontSize: 15, letterSpacing: 0.5 },

  resultBox: {
    backgroundColor: Colors.primaryMuted, borderRadius: Radius.md, padding: Spacing.lg,
    marginTop: Spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.primary + '25',
  },
  resultLabel: { ...Typography.label, marginBottom: Spacing.xs },
  resultValue: { fontFamily: 'Georgia, serif', fontSize: 36, fontWeight: '700', color: Colors.primary },
  resultHint: { ...Typography.caption, marginTop: Spacing.xs },

  ratioResults: { flexDirection: 'row', marginTop: Spacing.md, alignItems: 'center' },
  ratioCard: {
    flex: 1, alignItems: 'center', padding: Spacing.md,
    borderTopWidth: 3, marginTop: Spacing.sm,
    backgroundColor: Colors.background, borderRadius: Radius.md, ...Shadow.sm,
  },
  ratioEmoji: { fontSize: 28, marginBottom: 6 },
  ratioType: { ...Typography.label, textAlign: 'center', marginBottom: 4 },
  ratioValue: { fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: '700', color: Colors.primary },
  ratioDesc: { ...Typography.caption, marginTop: 2, textAlign: 'center' },
  ratioSep: { alignItems: 'center', paddingHorizontal: Spacing.sm },
  ratioOr: { ...Typography.caption, fontStyle: 'italic' },

  reverseResults: { marginTop: Spacing.md, gap: Spacing.sm },
  reverseRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.background, borderRadius: Radius.md,
    padding: Spacing.md, borderLeftWidth: 4, ...Shadow.sm,
  },
  reverseEmoji: { fontSize: 20 },
  reverseLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: Colors.text },
  reverseValue: { fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: '800' },
});
