import { Platform } from 'react-native';

export const colors = {
  background: '#050505',
  backgroundSoft: '#0E0E0E',
  surface: '#171717',
  surfaceAlt: '#222222',
  card: '#191919',
  input: '#242424',
  border: '#2B2B2B',
  text: '#FFFFFF',
  textMuted: '#B8B8B8',
  textSubtle: '#7D7D7D',
  primary: '#FFFFFF',
  primaryText: '#0A0A0A',
  accent: '#26F8FF',
  accentBlue: '#078BFF',
  accentSoft: '#113C3F',
  accentBorder: '#0F787D',
  danger: '#FF6B81',
  success: '#4CD964',
  warning: '#FFB020',
  purple: '#B02CD8',
  amber: '#FFCA3A',
  green: '#46E6A9',
  overlay: 'rgba(0, 0, 0, 0.45)',
};

export const gradients = {
  cyanBlue: ['#29F6FF', '#0A8DFF'] as const,
  electric: ['#29F6FF', '#0A8DFF', '#8C36FF'] as const,
  darkGlow: ['rgba(38, 248, 255, 0.14)', 'rgba(5, 5, 5, 0)'] as const,
  profile: ['#111111', '#2C1338', '#B02CD8'] as const,
  mintCard: ['#55D8CF', '#42B7A2'] as const,
  ember: ['#FFCA3A', '#FF6B81'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 16,
  lg: 28,
  xl: 34,
  pill: 999,
};

export const typography = {
  family: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
  title: 28,
  heading: 21,
  subheading: 17,
  body: 15,
  small: 14,
  caption: 12,
};

export const shadow = {
  shadowColor: '#26F8FF',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.22,
  shadowRadius: 18,
  elevation: 8,
};
