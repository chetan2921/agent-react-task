import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { gradients } from '@/theme';
import { AppText } from './AppText';

type GradientTextProps = {
  children: string;
  variant?: 'title' | 'heading' | 'subheading' | 'body' | 'small' | 'caption';
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export const GradientText = ({ children, variant = 'title', style, containerStyle }: GradientTextProps) => (
  <LinearGradient colors={gradients.cyanBlue} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.wrap, containerStyle]}>
    <AppText variant={variant} style={[styles.text, style]}>
      {children}
    </AppText>
  </LinearGradient>
);

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    borderRadius: 12,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '900',
    textShadowColor: 'rgba(38, 248, 255, 0.28)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
});
