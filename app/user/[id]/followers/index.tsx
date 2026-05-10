import { useLocalSearchParams } from 'expo-router';

import { UserListScreen } from '@/components/UserListScreen';
import { useFollowers } from '@/hooks/useAppData';

export default function FollowersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const followers = useFollowers(id);

  return (
    <UserListScreen
      title="Followers"
      users={followers.data ?? []}
      loading={followers.isLoading}
      error={followers.isError}
      onRetry={() => followers.refetch()}
    />
  );
}
