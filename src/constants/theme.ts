export const Colors = {
  // Core backgrounds — warm parchment, aged paper
  background: '#F2E8D9',
  backgroundDeep: '#EAD9C4',
  surface: '#FBF6EE',
  surfaceWarm: '#F7EFE2',

  // Primary — deep burnt sienna, autumn soil
  primary: '#7B3F2B',
  primaryLight: '#A0583E',
  primaryDark: '#5C2D1E',
  primaryMuted: '#7B3F2B22',

  // Accent — Norwegian forest green, pine
  accent: '#4A6741',
  accentLight: '#6B8F62',
  accentMuted: '#4A674120',

  // Gold — autumn birch, harvest
  gold: '#B8873A',
  goldLight: '#D4A85A',
  goldMuted: '#B8873A18',

  // Rose — Korean muted dusty rose
  rose: '#B87469',
  roseMuted: '#B8746918',

  // Text hierarchy
  text: '#2A1A0E',
  textSecondary: '#5C3D2E',
  textLight: '#9B7B6A',
  textMuted: '#BFA090',

  // Borders and dividers
  border: '#DDD0BE',
  borderLight: '#EDE0CF',
  divider: '#D4C4AE',

  // Semantic
  white: '#FBF6EE',
  error: '#9B3A2A',
  success: '#4A6741',
  warning: '#B8873A',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 6,
  md: 12,
  lg: 18,
  xl: 28,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#5C2D1E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#5C2D1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  lg: {
    shadowColor: '#5C2D1E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 10,
  },
};

export const Typography = {
  serif: {
    fontFamily: 'Georgia, serif',
  },
  displayLarge: {
    fontFamily: 'Georgia, serif',
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
    color: Colors.primary,
  },
  displayMedium: {
    fontFamily: 'Georgia, serif',
    fontSize: 26,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
    color: Colors.primary,
  },
  heading: {
    fontFamily: 'Georgia, serif',
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
  },
  body: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 23,
  },
  caption: {
    fontSize: 12,
    color: Colors.textLight,
    letterSpacing: 0.3,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
    color: Colors.textLight,
  },
};
