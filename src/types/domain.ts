import type { ImageSourcePropType } from 'react-native';

export type ID = string;

export type User = {
  id: ID;
  username: string;
  email: string;
  profilePhoto: string;
  profilePhotoSource?: ImageSourcePropType;
  totalSneakerCount: number;
  followers: number;
  following: number;
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Sneaker = {
  id: ID;
  sneakerName: string;
  brandName: string;
  description: string;
  sneakerUrl: string;
  photoUrl: string;
  photoSource?: ImageSourcePropType;
  price?: number;
  currency?: string;
  priceRaw?: string;
  sourceFile?: string;
  metadataOriginalRowHash?: string;
  metadata?: Record<string, unknown>;
  averageRating: number;
  ratingCount: number;
  postCount: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Post = {
  id: ID;
  userId: ID;
  sneakerId?: ID;
  mainImage: string;
  mainImageSource?: ImageSourcePropType;
  additionalImages: string[];
  brandName: string;
  sneakerName: string;
  description: string;
  purchaseLink?: string;
  purchaseAddress?: string;
  price?: number;
  year?: number;
  likes: ID[];
  createdAt: string;
  updatedAt: string;
  user?: User;
  sneaker?: Sneaker;
};

export type AuthSession = {
  currentUser: User | null;
  isLoggedIn: boolean;
  isFirstTime: boolean;
};

export type Pagination = {
  page: number;
  limit: number;
};

export type CreatePostPayload = {
  mainImage: string;
  mainImageSource?: ImageSourcePropType;
  brandName: string;
  sneakerName: string;
  description: string;
  sneakerId?: ID;
  additionalImages?: string[];
  purchaseLink?: string;
  purchaseAddress?: string;
  price?: number;
  year?: number;
};

export type UpdatePostPayload = Partial<
  Pick<Post, 'description' | 'purchaseLink' | 'purchaseAddress' | 'price' | 'year'>
>;

export type LikeResult = {
  liked: boolean;
  likeCount: number;
};
