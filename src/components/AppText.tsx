import { PropsWithChildren } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

import { colors, typography } from '@/theme';

type AppTextProps = PropsWithChildren<
  TextProps & {
    variant?: 'title' | 'heading' | 'subheading' | 'body' | 'small' | 'caption';
    muted?: boolean;
    accent?: boolean;
    style?: StyleProp<TextStyle>;
  }
>;

export const AppText = ({ children, variant = 'body', muted = false, accent = false, style, ...props }: AppTextProps) => {
  const fontSize = typography[variant];
  const fontWeight = variant === 'title' || variant === 'heading' ? '700' : variant === 'subheading' ? '600' : '400';

  return (
    <Text
      {...props}
      style={[
        {
          color: accent ? colors.accent : muted ? colors.textMuted : colors.text,
          fontFamily: typography.family,
          fontSize,
          fontWeight,
          lineHeight: Math.round(fontSize * 1.35),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
