import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Grid3X3, Search, Users } from 'lucide-react-native';
import { router } from 'expo-router';

import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { EmptyState, ErrorState, LoadingState } from '@/components/StateViews';
import { FeedPostCard } from '@/components/FeedPostCard';
import { useFeed, useFollowingFeed, useToggleLike } from '@/hooks/useAppData';
import { colors, radius, spacing } from '@/theme';
import type { Post } from '@/types/domain';

export default function FeedScreen() {
  const [mode, setMode] = useState<'all' | 'following'>('all');
  const feed = useFeed();
  const followingFeed = useFollowingFeed();
  const toggleLike = useToggleLike();
  const query = mode === 'all' ? feed : followingFeed;
  const posts = query.data ?? [];

  const renderItem = ({ item }: { item: Post }) => (
    <FeedPostCard post={item} onToggleLike={toggleLike.mutate} loadingLike={toggleLike.isPending} />
  );

  return (
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.header}>
        <View>
          <AppText variant="title" accent style={styles.logo}>SoleHead</AppText>
          <AppText muted>Curated drops, pickups, and collector notes.</AppText>
        </View>
        <Pressable style={styles.searchButton} onPress={() => router.push('/search')}>
          <Search color={colors.text} size={32} />
        </Pressable>
      </View>
      <View style={styles.segmentWrap}>
        <View style={styles.segment}>
          <Pressable onPress={() => setMode('all')} style={styles.segmentItem}>
            <Grid3X3 color={mode === 'all' ? colors.accent : colors.textMuted} size={24} />
            <AppText variant="subheading" style={mode === 'all' ? styles.activeText : styles.inactiveText}>
              All
            </AppText>
            {mode === 'all' ? <View style={styles.activeUnderline} /> : null}
          </Pressable>
          <Pressable onPress={() => setMode('following')} style={styles.segmentItem}>
            <Users color={mode === 'following' ? colors.accent : colors.textMuted} size={24} />
            <AppText variant="subheading" style={mode === 'following' ? styles.activeText : styles.inactiveText}>
              Following
            </AppText>
            {mode === 'following' ? <View style={styles.activeUnderline} /> : null}
          </Pressable>
        </View>
      </View>
      {query.isLoading ? (
        <LoadingState label="Loading posts" />
      ) : query.isError ? (
        <ErrorState message="The mock feed could not be loaded." onRetry={() => query.refetch()} />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <EmptyState
              title="No posts yet"
              body={mode === 'following' ? 'Follow more sneakerheads to fill this view.' : 'Create the first post.'}
            />
          }
        />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  logo: {
    fontSize: 30,
    fontWeight: '900',
  },
  searchButton: {
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentWrap: {
    borderBottomColor: colors.textMuted,
    borderBottomWidth: 1,
    marginHorizontal: -spacing.lg,
    marginBottom: spacing.lg,
  },
  segment: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  segmentItem: {
    minWidth: 140,
    alignItems: 'center',
    gap: spacing.xs,
    paddingBottom: spacing.sm,
  },
  activeText: {
    color: colors.accent,
    fontWeight: '700',
  },
  inactiveText: {
    color: colors.textMuted,
  },
  activeUnderline: {
    width: 40,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  list: {
    paddingBottom: 130,
  },
  separator: {
    height: spacing.lg,
  },
});
