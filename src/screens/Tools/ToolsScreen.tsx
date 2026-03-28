import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, Radius, Shadow } from '../../constants/theme';

// ──────────────────────────────────────────────
// A) Proofing Time Calculator
// ──────────────────────────────────────────────
function ProofingCalculator() {
  const [temp, setTemp] = useState('24');
  const [proofLevel, setProofLevel] = useState<'under' | 'perfect' | 'over'>('perfect');
  const [starterPct, setStarterPct] = useState('20');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const t = parseFloat(temp);
    const s = parseFloat(starterPct);
    if (isNaN(t) || isNaN(s) || s <= 0) { setResult('Please enter valid values'); return; }

    // Base: 4h at 24°C with 20% starter
    // Adjust for temp: ±30min per ±1°C from 24
    // Adjust for starter: -15min per +5% starter above 20%, +15min per -5%
    let hours = 4;
    hours += (24 - t) * 0.5;
    hours += (20 - s) / 5 * 0.25;

    // Proof level adjustments
    if (proofLevel === 'under') hours *= 0.75;
    else if (proofLevel === 'over') hours *= 1.3;

    hours = Math.max(0.5, hours);
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    setResult(`~${h}h ${m > 0 ? m + 'min' : ''}`.trim());
  }

  const levels: Array<{ key: 'under' | 'perfect' | 'over'; label: string; desc: string }> = [
    { key: 'under', label: 'Under', desc: 'More oven spring' },
    { key: 'perfect', label: 'Perfect', desc: 'Balanced' },
    { key: 'over', label: 'Over', desc: 'Open crumb' },
  ];

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>⏱️ Proofing Time</Text>

      <Text style={styles.label}>Dough Temperature (°C)</Text>
      <TextInput style={styles.input} value={temp} onChangeText={setTemp} keyboardType="decimal-pad" placeholder="24" placeholderTextColor={Colors.textLight} />

      <Text style={styles.label}>Desired Proof Level</Text>
      <View style={styles.toggleRow}>
        {levels.map(l => (
          <TouchableOpacity
            key={l.key}
            style={[styles.toggleBtn, proofLevel === l.key && styles.toggleBtnActive]}
            onPress={() => setProofLevel(l.key)}>
            <Text style={[styles.toggleBtnText, proofLevel === l.key && styles.toggleBtnTextActive]}>{l.label}</Text>
            <Text style={[styles.toggleBtnDesc, proofLevel === l.key && styles.toggleBtnDescActive]}>{l.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Starter % (of flour weight)</Text>
      <TextInput style={styles.input} value={starterPct} onChangeText={setStarterPct} keyboardType="decimal-pad" placeholder="20" placeholderTextColor={Colors.textLight} />

      <TouchableOpacity style={styles.calcBtn} onPress={calculate}>
        <Text style={styles.calcBtnText}>Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.result}>
          <Text style={styles.resultLabel}>Estimated proofing time</Text>
          <Text style={styles.resultValue}>{result}</Text>
        </View>
      )}
    </View>
  );
}

// ──────────────────────────────────────────────
// B) Starter / Yeast Ratio Calculator
// ──────────────────────────────────────────────
function RatioCalculator() {
  const [flour, setFlour] = useState('500');
  const [result, setResult] = useState<{ starter: string; yeast: string } | null>(null);

  function calculate() {
    const f = parseFloat(flour);
    if (isNaN(f) || f <= 0) { return; }
    const starterMin = Math.round(f * 0.15);
    const starterMax = Math.round(f * 0.20);
    const yeast = (f * 0.003).toFixed(1);
    setResult({ starter: `${starterMin}g – ${starterMax}g`, yeast: `${yeast}g` });
  }

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>⚖️ Starter / Yeast Ratio</Text>

      <Text style={styles.label}>Flour Weight (g)</Text>
      <TextInput style={styles.input} value={flour} onChangeText={setFlour} keyboardType="decimal-pad" placeholder="500" placeholderTextColor={Colors.textLight} />

      <TouchableOpacity style={styles.calcBtn} onPress={calculate}>
        <Text style={styles.calcBtnText}>Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.ratioResults}>
          <View style={styles.ratioCard}>
            <Text style={styles.ratioEmoji}>🌾</Text>
            <Text style={styles.ratioLabel}>Sourdough Starter</Text>
            <Text style={styles.ratioValue}>{result.starter}</Text>
            <Text style={styles.ratioDesc}>15–20% of flour</Text>
          </View>
          <View style={styles.ratioSep} />
          <View style={styles.ratioCard}>
            <Text style={styles.ratioEmoji}>🧂</Text>
            <Text style={styles.ratioLabel}>Active Dry Yeast</Text>
            <Text style={styles.ratioValue}>{result.yeast}</Text>
            <Text style={styles.ratioDesc}>0.3% of flour</Text>
          </View>
        </View>
      )}
    </View>
  );
}

// ──────────────────────────────────────────────
// C) Reverse Recipe Calculator
// ──────────────────────────────────────────────
function ReverseCalculator() {
  const [loafWeight, setLoafWeight] = useState('900');
  const [hydration, setHydration] = useState('75');
  const [result, setResult] = useState<{ flour: number; water: number; salt: number; starter: number } | null>(null);

  function calculate() {
    const w = parseFloat(loafWeight);
    const h = parseFloat(hydration) / 100;
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;
    // flour = loaf_weight / (1 + hydration + 0.02 + 0.2)
    const flour = Math.round(w / (1 + h + 0.02 + 0.2));
    const water = Math.round(flour * h);
    const salt = Math.round(flour * 0.02);
    const starter = Math.round(flour * 0.2);
    setResult({ flour, water, salt, starter });
  }

  return (
    <View style={styles.calcCard}>
      <Text style={styles.calcTitle}>🔢 Reverse Recipe</Text>

      <Text style={styles.label}>Desired Loaf Weight (g)</Text>
      <TextInput style={styles.input} value={loafWeight} onChangeText={setLoafWeight} keyboardType="decimal-pad" placeholder="900" placeholderTextColor={Colors.textLight} />

      <Text style={styles.label}>Desired Hydration (%)</Text>
      <TextInput style={styles.input} value={hydration} onChangeText={setHydration} keyboardType="decimal-pad" placeholder="75" placeholderTextColor={Colors.textLight} />

      <TouchableOpacity style={styles.calcBtn} onPress={calculate}>
        <Text style={styles.calcBtnText}>Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.reverseResult}>
          {[
            { label: 'Flour', value: result.flour, unit: 'g', color: Colors.primary },
            { label: 'Water', value: result.water, unit: 'g', color: '#4A90D9' },
            { label: 'Salt', value: result.salt, unit: 'g', color: Colors.textSecondary },
            { label: 'Starter', value: result.starter, unit: 'g', color: Colors.accent },
          ].map(item => (
            <View key={item.label} style={[styles.reverseRow, { borderLeftColor: item.color }]}>
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
      <Text style={styles.header}>Baking Tools</Text>
      <Text style={styles.subheader}>Calculators for the perfect bake</Text>
      <ProofingCalculator />
      <RatioCalculator />
      <ReverseCalculator />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, paddingBottom: Spacing.xxl },
  header: { fontSize: 24, fontWeight: '800', color: Colors.primary, paddingHorizontal: Spacing.xs, paddingTop: Spacing.sm },
  subheader: { fontSize: 14, color: Colors.textSecondary, paddingHorizontal: Spacing.xs, marginBottom: Spacing.md },
  calcCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg,
    marginBottom: Spacing.md, ...Shadow.sm,
  },
  calcTitle: { fontSize: 18, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.md },
  label: { fontSize: 13, fontWeight: '600', color: Colors.text, marginBottom: Spacing.xs, marginTop: Spacing.sm },
  input: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 16, color: Colors.text, backgroundColor: Colors.background,
  },
  toggleRow: { flexDirection: 'row', gap: Spacing.sm },
  toggleBtn: {
    flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    padding: Spacing.sm, alignItems: 'center', backgroundColor: Colors.background,
  },
  toggleBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  toggleBtnText: { fontSize: 14, fontWeight: '700', color: Colors.textSecondary },
  toggleBtnTextActive: { color: Colors.primary },
  toggleBtnDesc: { fontSize: 11, color: Colors.textLight, marginTop: 2 },
  toggleBtnDescActive: { color: Colors.primary },
  calcBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.md, padding: Spacing.md,
    alignItems: 'center', marginTop: Spacing.lg,
  },
  calcBtnText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  result: {
    backgroundColor: Colors.primary + '08', borderRadius: Radius.md,
    padding: Spacing.md, marginTop: Spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.primary + '30',
  },
  resultLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4 },
  resultValue: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  ratioResults: { flexDirection: 'row', marginTop: Spacing.md, alignItems: 'center' },
  ratioCard: { flex: 1, alignItems: 'center', padding: Spacing.sm },
  ratioEmoji: { fontSize: 28, marginBottom: 4 },
  ratioLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },
  ratioValue: { fontSize: 20, fontWeight: '800', color: Colors.primary, marginTop: 2 },
  ratioDesc: { fontSize: 11, color: Colors.textLight, marginTop: 2 },
  ratioSep: { width: 1, height: 60, backgroundColor: Colors.border },
  reverseResult: { marginTop: Spacing.md, gap: Spacing.sm },
  reverseRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.background, borderRadius: Radius.md,
    padding: Spacing.md, borderLeftWidth: 4,
  },
  reverseLabel: { fontSize: 15, fontWeight: '600', color: Colors.text },
  reverseValue: { fontSize: 20, fontWeight: '800' },
});
