import { UserListScreen } from '@/components/UserListScreen';
import { useFollowing } from '@/hooks/useAppData';
import { useAuth } from '@/providers/AppProviders';

export default function CurrentUserFollowingScreen() {
  const { currentUser } = useAuth();
  const following = useFollowing(currentUser?.id ?? 'missing');

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
