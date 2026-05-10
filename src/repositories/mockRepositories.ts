import { posts as seedPosts, sneakers as seedSneakers, users as seedUsers, followingByUserId } from '@/data/mockData';
import type { CreatePostPayload, ID, Post, Sneaker, UpdatePostPayload, User } from '@/types/domain';
import type { Repositories } from '@/types/repositories';

const wait = (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

type MockState = {
  users: User[];
  sneakers: Sneaker[];
  posts: Post[];
  followingByUserId: Record<string, string[]>;
  currentUserId: string | null;
};

const state: MockState = {
  users: clone(seedUsers),
  sneakers: clone(seedSneakers),
  posts: clone(seedPosts),
  followingByUserId: clone(followingByUserId),
  currentUserId: 'u-1',
};

const hydratePost = (post: Post): Post => ({
  ...post,
  user: state.users.find((user) => user.id === post.userId),
  sneaker: post.sneakerId ? state.sneakers.find((sneaker) => sneaker.id === post.sneakerId) : undefined,
});

const getUser = (id: ID) => {
  const user = state.users.find((item) => item.id === id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const getSneaker = (id: ID) => {
  const sneaker = state.sneakers.find((item) => item.id === id);
  if (!sneaker) {
    throw new Error('Sneaker not found');
  }
  return sneaker;
};

const getPost = (id: ID) => {
  const post = state.posts.find((item) => item.id === id);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

const updateFollowCounts = () => {
  state.users = state.users.map((user) => {
    const following = state.followingByUserId[user.id]?.length ?? 0;
    const followers = Object.values(state.followingByUserId).filter((ids) => ids.includes(user.id)).length;
    return { ...user, following, followers };
  });
};

export const resetMockRepositories = () => {
  state.users = clone(seedUsers);
  state.sneakers = clone(seedSneakers);
  state.posts = clone(seedPosts);
  state.followingByUserId = clone(followingByUserId);
  state.currentUserId = 'u-1';
};

export const repositories: Repositories = {
  auth: {
    async login(input) {
      await wait();
      const user =
        state.users.find((item) => item.email.toLowerCase() === input.email.toLowerCase()) ??
        state.users[0];
      state.currentUserId = user.id;
      return clone(user);
    },
    async register(input) {
      await wait();
      const created: User = {
        id: `u-${Date.now()}`,
        username: input.username,
        email: input.email,
        profilePhoto: '',
        totalSneakerCount: 0,
        followers: 0,
        following: 0,
        postCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.users.push(created);
      state.followingByUserId[created.id] = [];
      state.currentUserId = created.id;
      return clone(created);
    },
    async logout() {
      await wait(80);
      state.currentUserId = null;
    },
    async getProfile() {
      await wait(80);
      return state.currentUserId ? clone(getUser(state.currentUserId)) : null;
    },
    async updateProfile(input) {
      await wait();
      if (!state.currentUserId) {
        throw new Error('Not logged in');
      }
      const index = state.users.findIndex((user) => user.id === state.currentUserId);
      state.users[index] = { ...state.users[index], ...input, updatedAt: new Date().toISOString() };
      return clone(state.users[index]);
    },
    async uploadProfilePhoto(uri) {
      await wait();
      if (!state.currentUserId) {
        throw new Error('Not logged in');
      }
      const index = state.users.findIndex((user) => user.id === state.currentUserId);
      state.users[index] = { ...state.users[index], profilePhoto: uri, updatedAt: new Date().toISOString() };
      return clone(state.users[index]);
    },
  },
  sneakers: {
    async listSneakers(pagination = {}) {
      await wait();
      const page = pagination.page ?? 1;
      const limit = pagination.limit ?? state.sneakers.length;
      return clone(state.sneakers.slice((page - 1) * limit, page * limit));
    },
    async listTopSneakers(limit = 10) {
      await wait();
      return clone([...state.sneakers].sort((a, b) => b.averageRating - a.averageRating).slice(0, limit));
    },
    async listBrands() {
      await wait(80);
      return [...new Set(state.sneakers.map((sneaker) => sneaker.brandName))];
    },
    async searchSneakers(query) {
      await wait();
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        return clone(state.sneakers);
      }
      return clone(
        state.sneakers.filter(
          (sneaker) =>
            sneaker.sneakerName.toLowerCase().includes(normalized) ||
            sneaker.brandName.toLowerCase().includes(normalized),
        ),
      );
    },
    async getSneaker(id) {
      await wait();
      return clone(getSneaker(id));
    },
    async rateSneaker(id, rating) {
      await wait();
      const index = state.sneakers.findIndex((item) => item.id === id);
      const sneaker = state.sneakers[index];
      const nextCount = sneaker.ratingCount + 1;
      const nextAverage = (sneaker.averageRating * sneaker.ratingCount + rating) / nextCount;
      state.sneakers[index] = {
        ...sneaker,
        averageRating: Number(nextAverage.toFixed(1)),
        ratingCount: nextCount,
        updatedAt: new Date().toISOString(),
      };
      return clone(state.sneakers[index]);
    },
  },
  posts: {
    async listFeed(pagination = {}) {
      await wait();
      const page = pagination.page ?? 1;
      const limit = pagination.limit ?? state.posts.length;
      return clone(state.posts.map(hydratePost).slice((page - 1) * limit, page * limit));
    },
    async listFollowing(pagination = {}) {
      await wait();
      const currentUserId = state.currentUserId ?? 'u-1';
      const following = state.followingByUserId[currentUserId] ?? [];
      const page = pagination.page ?? 1;
      const limit = pagination.limit ?? state.posts.length;
      return clone(
        state.posts
          .filter((post) => following.includes(post.userId))
          .map(hydratePost)
          .slice((page - 1) * limit, page * limit),
      );
    },
    async getPost(id) {
      await wait();
      return clone(hydratePost(getPost(id)));
    },
    async createPost(payload, userId) {
      await wait();
      const created: Post = {
        id: `p-${Date.now()}`,
        userId,
        sneakerId: payload.sneakerId,
        mainImage: payload.mainImage,
        mainImageSource: payload.mainImageSource,
        additionalImages: payload.additionalImages ?? [],
        brandName: payload.brandName,
        sneakerName: payload.sneakerName,
        description: payload.description,
        purchaseLink: payload.purchaseLink,
        purchaseAddress: payload.purchaseAddress,
        price: payload.price,
        year: payload.year,
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.posts.unshift(created);
      state.users = state.users.map((user) =>
        user.id === userId ? { ...user, postCount: (user.postCount ?? 0) + 1 } : user,
      );
      return clone(hydratePost(created));
    },
    async updatePost(id, payload: UpdatePostPayload) {
      await wait();
      const index = state.posts.findIndex((post) => post.id === id);
      if (index < 0) {
        throw new Error('Post not found');
      }
      state.posts[index] = { ...state.posts[index], ...payload, updatedAt: new Date().toISOString() };
      return clone(hydratePost(state.posts[index]));
    },
    async deletePost(id) {
      await wait();
      const post = getPost(id);
      state.posts = state.posts.filter((item) => item.id !== id);
      state.users = state.users.map((user) =>
        user.id === post.userId ? { ...user, postCount: Math.max((user.postCount ?? 1) - 1, 0) } : user,
      );
    },
    async toggleLike(id, userId) {
      await wait(100);
      const index = state.posts.findIndex((post) => post.id === id);
      if (index < 0) {
        throw new Error('Post not found');
      }
      const post = state.posts[index];
      const liked = post.likes.includes(userId);
      const likes = liked ? post.likes.filter((item) => item !== userId) : [...post.likes, userId];
      state.posts[index] = { ...post, likes };
      return { liked: !liked, likeCount: likes.length };
    },
    async listUserPosts(userId, pagination = {}) {
      await wait();
      const page = pagination.page ?? 1;
      const limit = pagination.limit ?? state.posts.length;
      return clone(
        state.posts
          .filter((post) => post.userId === userId)
          .map(hydratePost)
          .slice((page - 1) * limit, page * limit),
      );
    },
  },
  users: {
    async getUserProfile(userId) {
      await wait();
      return clone(getUser(userId));
    },
    async getUserByUsername(username) {
      await wait();
      const user = state.users.find((item) => item.username.toLowerCase() === username.toLowerCase());
      if (!user) {
        throw new Error('User not found');
      }
      return clone(user);
    },
    async searchUsers(query) {
      await wait();
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        return clone(state.users);
      }
      return clone(
        state.users.filter(
          (user) =>
            user.username.toLowerCase().includes(normalized) ||
            user.email.toLowerCase().includes(normalized),
        ),
      );
    },
    async followUser(currentUserId, targetUserId) {
      await wait(100);
      const following = state.followingByUserId[currentUserId] ?? [];
      if (!following.includes(targetUserId)) {
        state.followingByUserId[currentUserId] = [...following, targetUserId];
      }
      updateFollowCounts();
    },
    async unfollowUser(currentUserId, targetUserId) {
      await wait(100);
      state.followingByUserId[currentUserId] = (state.followingByUserId[currentUserId] ?? []).filter(
        (id) => id !== targetUserId,
      );
      updateFollowCounts();
    },
    async getFollowers(userId) {
      await wait();
      const followerIds = Object.entries(state.followingByUserId)
        .filter(([, following]) => following.includes(userId))
        .map(([id]) => id);
      return clone(state.users.filter((user) => followerIds.includes(user.id)));
    },
    async getFollowing(userId) {
      await wait();
      const followingIds = state.followingByUserId[userId] ?? [];
      return clone(state.users.filter((user) => followingIds.includes(user.id)));
    },
    async isFollowing(currentUserId, targetUserId) {
      await wait(60);
      return (state.followingByUserId[currentUserId] ?? []).includes(targetUserId);
    },
  },
};
