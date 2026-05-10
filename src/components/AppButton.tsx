import { PropsWithChildren, isValidElement } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { colors, gradients, radius, shadow, spacing, typography } from '@/theme';
import { AppText } from './AppText';

type AppButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}>;

export const AppButton = ({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: AppButtonProps) => {
  const isPrimary = variant === 'primary';
  const isDanger = variant === 'danger';
  const content = loading ? (
    <ActivityIndicator color={isPrimary || isDanger ? colors.primary : colors.text} />
  ) : isValidElement(children) ? (
    children
  ) : (
    <AppText
      style={[
        styles.label,
        isPrimary && styles.primaryLabel,
        isDanger && styles.dangerLabel,
        variant === 'ghost' && styles.ghostLabel,
        textStyle,
      ]}
    >
      {children}
    </AppText>
  );

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        isDanger && styles.danger,
        (pressed || disabled || loading) && styles.pressed,
        style,
      ]}
    >
      {isPrimary ? (
        <LinearGradient colors={gradients.cyanBlue} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  gradient: {
    minHeight: 48,
    alignSelf: 'stretch',
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -spacing.lg,
    marginVertical: -spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    ...shadow,
  },
  secondary: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  pressed: {
    opacity: 0.72,
  },
  label: {
    fontSize: typography.body,
    fontWeight: '700',
  },
  primaryLabel: {
    color: colors.primary,
  },
  dangerLabel: {
    color: colors.primary,
  },
  ghostLabel: {
    color: colors.textMuted,
  },
});
