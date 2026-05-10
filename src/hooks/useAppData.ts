import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuth, useRepositories } from '@/providers/AppProviders';
import type { CreatePostPayload, ID, UpdatePostPayload } from '@/types/domain';

export const queryKeys = {
  feed: ['feed'] as const,
  followingFeed: ['following-feed'] as const,
  sneakers: ['sneakers'] as const,
  topSneakers: ['top-sneakers'] as const,
  brands: ['brands'] as const,
  users: ['users'] as const,
  currentUser: ['current-user'] as const,
  post: (id: ID) => ['post', id] as const,
  sneaker: (id: ID) => ['sneaker', id] as const,
  user: (id: ID) => ['user', id] as const,
  userPosts: (id: ID) => ['user-posts', id] as const,
  followers: (id: ID) => ['followers', id] as const,
  following: (id: ID) => ['following', id] as const,
  isFollowing: (currentUserId: ID, targetUserId: ID) => ['is-following', currentUserId, targetUserId] as const,
};

export const useFeed = () => {
  const { posts } = useRepositories();
  return useQuery({ queryKey: queryKeys.feed, queryFn: () => posts.listFeed() });
};

export const useFollowingFeed = () => {
  const { posts } = useRepositories();
  return useQuery({ queryKey: queryKeys.followingFeed, queryFn: () => posts.listFollowing() });
};

export const useSneakers = () => {
  const { sneakers } = useRepositories();
  return useQuery({ queryKey: queryKeys.sneakers, queryFn: () => sneakers.listSneakers() });
};

export const useTopSneakers = () => {
  const { sneakers } = useRepositories();
  return useQuery({ queryKey: queryKeys.topSneakers, queryFn: () => sneakers.listTopSneakers(5) });
};

export const useBrands = () => {
  const { sneakers } = useRepositories();
  return useQuery({ queryKey: queryKeys.brands, queryFn: () => sneakers.listBrands() });
};

export const useSneaker = (id: ID) => {
  const { sneakers } = useRepositories();
  return useQuery({ queryKey: queryKeys.sneaker(id), queryFn: () => sneakers.getSneaker(id) });
};

export const usePost = (id: ID) => {
  const { posts } = useRepositories();
  return useQuery({ queryKey: queryKeys.post(id), queryFn: () => posts.getPost(id) });
};

export const useUser = (id: ID) => {
  const { users } = useRepositories();
  return useQuery({ queryKey: queryKeys.user(id), queryFn: () => users.getUserProfile(id) });
};

export const useUserPosts = (id: ID) => {
  const { posts } = useRepositories();
  return useQuery({ queryKey: queryKeys.userPosts(id), queryFn: () => posts.listUserPosts(id) });
};

export const useFollowers = (id: ID) => {
  const { users } = useRepositories();
  return useQuery({ queryKey: queryKeys.followers(id), queryFn: () => users.getFollowers(id) });
};

export const useFollowing = (id: ID) => {
  const { users } = useRepositories();
  return useQuery({ queryKey: queryKeys.following(id), queryFn: () => users.getFollowing(id) });
};

export const useIsFollowing = (targetUserId: ID) => {
  const { users } = useRepositories();
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.id ?? 'anonymous';

  return useQuery({
    queryKey: queryKeys.isFollowing(currentUserId, targetUserId),
    queryFn: () => users.isFollowing(currentUserId, targetUserId),
    enabled: Boolean(currentUser?.id) && currentUserId !== targetUserId,
  });
};

export const useSearch = (query: string) => {
  const { sneakers, users } = useRepositories();

  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const [sneakerResults, userResults] = await Promise.all([
        sneakers.searchSneakers(query),
        users.searchUsers(query),
      ]);
      return { sneakers: sneakerResults, users: userResults };
    },
  });
};

export const useCreatePost = () => {
  const { posts } = useRepositories();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => {
      if (!currentUser) {
        throw new Error('Login required');
      }
      return posts.createPost(payload, currentUser.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
      if (currentUser) {
        queryClient.invalidateQueries({ queryKey: queryKeys.userPosts(currentUser.id) });
      }
    },
  });
};

export const useToggleLike = () => {
  const { posts } = useRepositories();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: ID) => {
      if (!currentUser) {
        throw new Error('Login required');
      }
      return posts.toggleLike(postId, currentUser.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
      queryClient.invalidateQueries({ queryKey: queryKeys.followingFeed });
    },
  });
};

export const useUpdatePost = (postId: ID) => {
  const { posts } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePostPayload) => posts.updatePost(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
    },
  });
};

export const useDeletePost = () => {
  const { posts } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: ID) => posts.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
    },
  });
};

export const useFollowUser = (targetUserId: ID) => {
  const { users } = useRepositories();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nextFollowing: boolean) => {
      if (!currentUser) {
        throw new Error('Login required');
      }
      if (nextFollowing) {
        await users.followUser(currentUser.id, targetUserId);
      } else {
        await users.unfollowUser(currentUser.id, targetUserId);
      }
    },
    onSuccess: () => {
      if (currentUser) {
        queryClient.invalidateQueries({ queryKey: queryKeys.isFollowing(currentUser.id, targetUserId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.user(currentUser.id) });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.user(targetUserId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.followers(targetUserId) });
    },
  });
};

export const useRateSneaker = (sneakerId: ID) => {
  const { sneakers } = useRepositories();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rating: number) => sneakers.rateSneaker(sneakerId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sneaker(sneakerId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sneakers });
      queryClient.invalidateQueries({ queryKey: queryKeys.topSneakers });
    },
  });
};
