import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { GradientText } from '@/components/GradientText';
import { IntroHero } from '@/components/IntroHero';
import { useAuth } from '@/providers/AppProviders';
import { colors, radius, spacing } from '@/theme';

export default function IntroScreen() {
  const { completeIntro } = useAuth();

  const start = async () => {
    await completeIntro();
    router.replace('/login');
  };

  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.hero}>
        <IntroHero />
      </View>
      <View style={styles.copy}>
        <GradientText style={styles.title}>SoleHead</GradientText>
        <AppText muted style={styles.body}>
          Track sneaker finds, rate pairs, follow collectors, and build a feed around what people are actually wearing.
        </AppText>
        <View style={styles.valueRow}>
          {['Discover', 'Collect', 'Post'].map((item) => (
            <View key={item} style={styles.valuePill}>
              <AppText variant="caption" style={styles.valueText}>{item}</AppText>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.actions}>
        <AppButton onPress={start}>Start collecting</AppButton>
        <AppText variant="caption" muted style={styles.note}>
          Mock data is enabled for this first React Native milestone.
        </AppText>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl,
  },
  hero: {
    minHeight: 300,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(38, 248, 255, 0.07)',
    borderColor: colors.accentBorder,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  copy: {
    gap: spacing.md,
  },
  title: {
    fontSize: 38,
  },
  body: {
    fontSize: 15,
  },
  actions: {
    gap: spacing.md,
  },
  valueRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  valuePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  valueText: {
    fontWeight: '800',
  },
  note: {
    textAlign: 'center',
  },
});
