import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../constants/theme';

interface Props {
  title: string;
  subtitle?: string;
  rightIcon?: string;
  rightLabel?: string;
  onRightPress?: () => void;
  ornament?: string;
}

export default function ScreenHeader({ title, subtitle, rightIcon, rightLabel, onRightPress, ornament }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topLine} />
      <View style={styles.inner}>
        <View style={styles.left}>
          {ornament ? <Text style={styles.ornament}>{ornament}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {onRightPress && (
          <TouchableOpacity style={styles.rightBtn} onPress={onRightPress}>
            {rightIcon && <Ionicons name={rightIcon as any} size={18} color={Colors.white} />}
            {rightLabel && <Text style={styles.rightLabel}>{rightLabel}</Text>}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingTop: Spacing.lg,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  topLine: {
    height: 2,
    backgroundColor: Colors.gold,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    opacity: 0.5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  left: { flex: 1 },
  ornament: {
    fontSize: 11,
    color: Colors.gold,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    ...Typography.displayMedium,
    fontSize: 22,
  },
  subtitle: {
    ...Typography.caption,
    marginTop: 2,
  },
  rightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: 6,
  },
  rightLabel: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  bottomLine: {
    height: 1,
    backgroundColor: Colors.divider,
  },
});
