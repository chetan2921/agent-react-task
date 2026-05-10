import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Dumbbell, TrendingUp } from 'lucide-react-native';

import { colors, radius, spacing } from '@/theme';
import type { Sneaker } from '@/types/domain';
import { AppImage } from './AppImage';
import { AppText } from './AppText';

export const SneakerCard = ({ sneaker, compact = false }: { sneaker: Sneaker; compact?: boolean }) => (
  <Pressable
    accessibilityRole="button"
    onPress={() => router.push(`/sneaker/${sneaker.id}`)}
    style={({ pressed }) => [styles.card, compact && styles.compact, pressed && styles.pressed]}
  >
    <AppImage uri={sneaker.photoUrl} source={sneaker.photoSource} style={styles.image} />
    <View style={styles.body}>
      <AppText accent numberOfLines={1} style={styles.brand}>
        {sneaker.brandName}
      </AppText>
      <AppText variant="subheading" numberOfLines={2}>
        {sneaker.sneakerName}
      </AppText>
      <View style={styles.meta}>
        <Dumbbell color={colors.accent} size={14} />
        <AppText variant="caption">{sneaker.averageRating.toFixed(1)}</AppText>
        <AppText variant="caption" muted>
          {sneaker.postCount} posts
        </AppText>
      </View>
      {sneaker.priceRaw ? (
        <View style={styles.priceRow}>
          <TrendingUp color={colors.green} size={14} />
          <AppText variant="caption" style={styles.price}>
            {sneaker.priceRaw}
          </AppText>
        </View>
      ) : null}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    width: 172,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  compact: {
    width: '48%',
  },
  pressed: {
    opacity: 0.72,
  },
  image: {
    height: 168,
    margin: spacing.md,
    marginBottom: 0,
    borderRadius: radius.md,
  },
  body: {
    gap: spacing.xs,
    padding: spacing.md,
  },
  brand: {
    fontWeight: '800',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  price: {
    color: colors.green,
    fontWeight: '800',
  },
});
