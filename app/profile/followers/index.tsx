import { UserListScreen } from '@/components/UserListScreen';
import { useFollowers } from '@/hooks/useAppData';
import { useAuth } from '@/providers/AppProviders';

export default function CurrentUserFollowersScreen() {
  const { currentUser } = useAuth();
  const followers = useFollowers(currentUser?.id ?? 'missing');

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
