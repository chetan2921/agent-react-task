import { router, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { EmptyState, ErrorState, LoadingState } from '@/components/StateViews';
import { FeedPostCard } from '@/components/FeedPostCard';
import { ProfileHeader } from '@/components/ProfileHeader';
import { useFollowUser, useIsFollowing, useUser, useUserPosts } from '@/hooks/useAppData';
import { useAuth } from '@/providers/AppProviders';
import { spacing } from '@/theme';
import type { Post } from '@/types/domain';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuth();
  const user = useUser(id);
  const posts = useUserPosts(id);
  const isFollowing = useIsFollowing(id);
  const follow = useFollowUser(id);
  const isCurrentUser = currentUser?.id === id;

  if (user.isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Loading profile" />
      </AppScreen>
    );
  }

  if (user.isError || !user.data) {
    return (
      <AppScreen>
        <ErrorState message="The user profile could not be loaded." onRetry={() => user.refetch()} />
      </AppScreen>
    );
  }

  return (
    <AppScreen contentStyle={styles.screen}>
      <FlatList
        data={posts.data ?? []}
        keyExtractor={(item: Post) => item.id}
        renderItem={({ item }) => <FeedPostCard post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <AppButton variant="ghost" onPress={() => router.back()} style={styles.backButton}>
              Back
            </AppButton>
            <ProfileHeader user={user.data} isCurrentUser={isCurrentUser} />
            {!isCurrentUser ? (
              <AppButton
                variant={isFollowing.data ? 'secondary' : 'primary'}
                onPress={() => follow.mutate(!isFollowing.data)}
                loading={follow.isPending || isFollowing.isLoading}
              >
                {isFollowing.data ? 'Following' : 'Follow'}
              </AppButton>
            ) : null}
            <AppText variant="heading">Posts</AppText>
          </View>
        }
        ListEmptyComponent={posts.isLoading ? <LoadingState /> : <EmptyState title="No posts yet" />}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
  },
  separator: {
    height: spacing.lg,
  },
});
