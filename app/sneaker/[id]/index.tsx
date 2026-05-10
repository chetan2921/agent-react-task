import { router, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

import { AppButton } from '@/components/AppButton';
import { AppImage } from '@/components/AppImage';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { RatingControl } from '@/components/RatingControl';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { useRateSneaker, useSneaker } from '@/hooks/useAppData';
import { colors, radius, spacing } from '@/theme';

export default function SneakerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sneaker = useSneaker(id);
  const rateSneaker = useRateSneaker(id);
  const [rating, setRating] = useState(0);

  if (sneaker.isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Loading sneaker" />
      </AppScreen>
    );
  }

  if (sneaker.isError || !sneaker.data) {
    return (
      <AppScreen>
        <ErrorState message="The sneaker could not be loaded." onRetry={() => sneaker.refetch()} />
      </AppScreen>
    );
  }

  const item = sneaker.data;

  const submitRating = async (nextRating: number) => {
    setRating(nextRating);
    await rateSneaker.mutateAsync(nextRating);
  };

  return (
    <AppScreen scroll>
      <View style={styles.header}>
        <AppButton variant="ghost" onPress={() => router.back()} style={styles.backButton}>
          Back
        </AppButton>
        <AppText variant="title">{item.sneakerName}</AppText>
        <AppText muted>{item.brandName}</AppText>
      </View>
      <AppImage uri={item.photoUrl} source={item.photoSource} style={styles.image} contentFit="contain" />
      <View style={styles.panel}>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <AppText variant="heading">{item.averageRating.toFixed(1)}</AppText>
            <AppText variant="caption" muted>
              Rating
            </AppText>
          </View>
          <View style={styles.stat}>
            <AppText variant="heading">{item.ratingCount}</AppText>
            <AppText variant="caption" muted>
              Votes
            </AppText>
          </View>
          <View style={styles.stat}>
            <AppText variant="heading">{item.postCount}</AppText>
            <AppText variant="caption" muted>
              Posts
            </AppText>
          </View>
        </View>
        <AppText>{item.description}</AppText>
        <View style={styles.priceRow}>
          <AppText variant="subheading">{item.priceRaw ?? (item.price ? `$${item.price}` : 'Price unavailable')}</AppText>
          {item.currency ? <AppText muted>{item.currency}</AppText> : null}
        </View>
        <View style={styles.ratingBox}>
          <AppText variant="subheading">Rate this sneaker</AppText>
          <RatingControl value={rating} onChange={submitRating} disabled={rateSneaker.isPending} />
        </View>
        {item.sneakerUrl ? (
          <AppButton variant="secondary" onPress={() => Linking.openURL(item.sneakerUrl)}>
            <View style={styles.iconLabel}>
              <ExternalLink color={colors.text} size={16} />
              <AppText>Open product page</AppText>
            </View>
          </AppButton>
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
  },
  image: {
    height: 300,
    borderRadius: radius.lg,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  panel: {
    gap: spacing.lg,
    paddingVertical: spacing.xl,
  },
  statRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingBox: {
    gap: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
