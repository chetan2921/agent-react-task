import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';
import { AppText } from './AppText';

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export const AppInput = ({ label, error, style, ...props }: AppInputProps) => (
  <View style={styles.wrap}>
    {label ? <AppText style={styles.label}>{label}</AppText> : null}
    <TextInput
      placeholderTextColor={colors.textSubtle}
      {...props}
      style={[styles.input, style]}
    />
    {error ? (
      <AppText variant="caption" style={styles.error}>
        {error}
      </AppText>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.xs,
  },
  label: {
    fontWeight: '600',
  },
  input: {
    minHeight: 58,
    borderRadius: radius.lg,
    backgroundColor: colors.input,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.text,
    fontFamily: typography.family,
    fontSize: typography.body,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  error: {
    color: colors.danger,
  },
});
