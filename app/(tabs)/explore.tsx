import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Bell, Filter, Search, SlidersHorizontal } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { EmptyState, ErrorState, LoadingState } from '@/components/StateViews';
import { SneakerCard } from '@/components/SneakerCard';
import { useSneakers, useTopSneakers } from '@/hooks/useAppData';
import { colors, gradients, radius, spacing } from '@/theme';
import type { Sneaker } from '@/types/domain';

export default function ExploreScreen() {
  const sneakers = useSneakers();
  const topSneakers = useTopSneakers();

  if (sneakers.isLoading || topSneakers.isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Loading sneakers" />
      </AppScreen>
    );
  }

  if (sneakers.isError || topSneakers.isError) {
    return (
      <AppScreen>
        <ErrorState message="The mock sneaker catalog could not be loaded." />
      </AppScreen>
    );
  }

  return (
    <AppScreen scroll>
      <View style={styles.header}>
        <AppText variant="title" accent style={styles.title}>Explore</AppText>
        <View style={styles.headerActions}>
          <Pressable style={styles.iconButton} onPress={() => router.push('/search?query=classic')}>
            <Filter color={colors.text} size={26} />
          </Pressable>
          <Pressable style={styles.iconButton} onPress={() => router.push('/search')}>
            <Search color={colors.text} size={28} />
          </Pressable>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.chips}>
          {['Classic', 'Basketball', 'Running', 'Streetwear'].map((chip, index) => (
            <View key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
              <AppText variant="caption" style={index === 0 && styles.chipActiveText}>
                {chip}
              </AppText>
            </View>
          ))}
        </View>
        <AppText variant="heading">🔥 New & Upcoming</AppText>
        <LinearGradient colors={gradients.mintCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
          <View style={styles.badge}>
            <AppText style={styles.badgeText}>Classic</AppText>
          </View>
          <AppText style={styles.spark}>⭐</AppText>
          <View style={styles.heroBottom}>
            <View>
              <AppText style={styles.heroBrand}>Adidas</AppText>
              <AppText variant="heading" style={styles.heroName}>Stan Smith "Green"</AppText>
              <AppText style={styles.heroBrand}>Available</AppText>
            </View>
            <AppText variant="heading">$85</AppText>
          </View>
        </LinearGradient>
        <View style={styles.dropInsight}>
          <View style={styles.insightIcon}>
            <Bell color={colors.accent} size={18} />
          </View>
          <View style={styles.insightCopy}>
            <AppText style={styles.insightTitle}>Drop reminder ready</AppText>
            <AppText variant="caption" muted>
              This section can later connect to real release dates from the backend.
            </AppText>
          </View>
          <SlidersHorizontal color={colors.textMuted} size={18} />
        </View>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
      </View>
      <View style={styles.section}>
        <AppText variant="heading">📈 Trending</AppText>
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          data={sneakers.data ?? []}
          keyExtractor={(item: Sneaker) => item.id}
          renderItem={({ item }) => <SneakerCard sneaker={item} compact />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={<EmptyState title="No sneakers found" />}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
    borderColor: '#555555',
    borderWidth: 1,
  },
  section: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipActiveText: {
    color: colors.primaryText,
    fontWeight: '900',
  },
  heroCard: {
    minHeight: 210,
    justifyContent: 'space-between',
    gap: spacing.sm,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  badgeText: {
    fontWeight: '800',
  },
  spark: {
    fontSize: 38,
  },
  heroBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  heroBrand: {
    color: 'rgba(255, 255, 255, 0.72)',
  },
  heroName: {
    fontWeight: '900',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dropInsight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  insightIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
  },
  insightCopy: {
    flex: 1,
  },
  insightTitle: {
    fontWeight: '800',
  },
  dot: {
    width: 16,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: '#555555',
  },
  dotActive: {
    width: 42,
    backgroundColor: colors.accent,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  separator: {
    height: spacing.md,
  },
});
