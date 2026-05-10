import type {
  CreatePostPayload,
  ID,
  LikeResult,
  Pagination,
  Post,
  Sneaker,
  UpdatePostPayload,
  User,
} from './domain';

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  username: string;
};

export type AuthRepository = {
  login(input: LoginInput): Promise<User>;
  register(input: RegisterInput): Promise<User>;
  logout(): Promise<void>;
  getProfile(): Promise<User | null>;
  updateProfile(input: Partial<Pick<User, 'username' | 'email'>>): Promise<User>;
  uploadProfilePhoto(uri: string): Promise<User>;
};

export type SneakerRepository = {
  listSneakers(pagination?: Partial<Pagination>): Promise<Sneaker[]>;
  listTopSneakers(limit?: number): Promise<Sneaker[]>;
  listBrands(): Promise<string[]>;
  searchSneakers(query: string): Promise<Sneaker[]>;
  getSneaker(id: ID): Promise<Sneaker>;
  rateSneaker(id: ID, rating: number): Promise<Sneaker>;
};

export type PostRepository = {
  listFeed(pagination?: Partial<Pagination>): Promise<Post[]>;
  listFollowing(pagination?: Partial<Pagination>): Promise<Post[]>;
  getPost(id: ID): Promise<Post>;
  createPost(payload: CreatePostPayload, userId: ID): Promise<Post>;
  updatePost(id: ID, payload: UpdatePostPayload): Promise<Post>;
  deletePost(id: ID): Promise<void>;
  toggleLike(id: ID, userId: ID): Promise<LikeResult>;
  listUserPosts(userId: ID, pagination?: Partial<Pagination>): Promise<Post[]>;
};

export type UserRepository = {
  getUserProfile(userId: ID): Promise<User>;
  getUserByUsername(username: string): Promise<User>;
  searchUsers(query: string): Promise<User[]>;
  followUser(currentUserId: ID, targetUserId: ID): Promise<void>;
  unfollowUser(currentUserId: ID, targetUserId: ID): Promise<void>;
  getFollowers(userId: ID): Promise<User[]>;
  getFollowing(userId: ID): Promise<User[]>;
  isFollowing(currentUserId: ID, targetUserId: ID): Promise<boolean>;
};

export type Repositories = {
  auth: AuthRepository;
  sneakers: SneakerRepository;
  posts: PostRepository;
  users: UserRepository;
};
