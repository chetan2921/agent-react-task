import { useLocalSearchParams } from 'expo-router';

import { UserListScreen } from '@/components/UserListScreen';
import { useFollowing } from '@/hooks/useAppData';

export default function FollowingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const following = useFollowing(id);

  return (
    <UserListScreen
      title="Following"
      users={following.data ?? []}
      loading={following.isLoading}
      error={following.isError}
      onRetry={() => following.refetch()}
    />
  );
}
