import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AlertCircle, SearchX } from 'lucide-react-native';

import { colors, radius, spacing } from '@/theme';
import { AppButton } from './AppButton';
import { AppText } from './AppText';

export const LoadingState = ({ label = 'Loading' }: { label?: string }) => (
  <View style={styles.state}>
    <ActivityIndicator color={colors.accent} />
    <AppText muted>{label}</AppText>
  </View>
);

export const EmptyState = ({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <View style={styles.state}>
    <SearchX color={colors.textMuted} size={32} />
    <AppText variant="subheading" style={styles.centerText}>
      {title}
    </AppText>
    {body ? (
      <AppText muted style={styles.centerText}>
        {body}
      </AppText>
    ) : null}
    {actionLabel && onAction ? (
      <AppButton variant="secondary" onPress={onAction}>
        {actionLabel}
      </AppButton>
    ) : null}
  </View>
);

export const ErrorState = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <View style={styles.state}>
    <AlertCircle color={colors.danger} size={32} />
    <AppText variant="subheading" style={styles.centerText}>
      Something went wrong
    </AppText>
    <AppText muted style={styles.centerText}>
      {message}
    </AppText>
    {onRetry ? (
      <AppButton variant="secondary" onPress={onRetry}>
        Retry
      </AppButton>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  state: {
    flex: 1,
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  centerText: {
    textAlign: 'center',
  },
});
