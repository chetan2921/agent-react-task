import { router } from 'expo-router';
import { Bookmark, Heart, MessageCircle, MoreHorizontal, ShoppingBag } from 'lucide-react-native';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { useAuth } from '@/providers/AppProviders';
import { colors, radius, shadow, spacing } from '@/theme';
import type { Post } from '@/types/domain';
import { AppButton } from './AppButton';
import { Avatar } from './Avatar';
import { AppImage } from './AppImage';
import { AppText } from './AppText';

export const FeedPostCard = ({
  post,
  onToggleLike,
  loadingLike = false,
}: {
  post: Post;
  onToggleLike?: (postId: string) => void;
  loadingLike?: boolean;
}) => {
  const { currentUser } = useAuth();
  const liked = Boolean(currentUser && post.likes.includes(currentUser.id));

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/post/${post.id}`)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Pressable onPress={() => post.userId !== currentUser?.id && router.push(`/user/${post.userId}`)}>
          <Avatar user={post.user} size={62} />
        </Pressable>
        <View style={styles.headerText}>
          <AppText style={styles.username}>{post.user?.username ?? 'Sneakerhead'}</AppText>
          <AppText variant="caption" muted>
            {post.year ? `${new Date().getFullYear() - post.year + 1}d ago` : '235d ago'}
          </AppText>
        </View>
        <Pressable
          onPress={() => Alert.alert('Post options', 'Edit, report, and share actions can be wired here.')}
          style={styles.moreButton}
        >
          <MoreHorizontal color={colors.textMuted} size={20} />
        </Pressable>
      </View>
      <AppImage uri={post.mainImage} source={post.mainImageSource} style={styles.postImage} />
      <View style={styles.body}>
        <View style={styles.captionBlock}>
          <AppText variant="caption" accent style={styles.captionLabel}>
            Pickup note
          </AppText>
          <AppText muted numberOfLines={2}>
            {post.description}
          </AppText>
        </View>
        <View style={styles.footerRow}>
          <View style={styles.descriptionPill}>
            <AppText variant="subheading" numberOfLines={1}>
              <AppText style={styles.pillAccent} accent>
                {post.brandName.toLowerCase()}
              </AppText>{' '}
              {post.sneakerName.toLowerCase()}
            </AppText>
          </View>
          <AppButton
            variant="secondary"
            onPress={() => onToggleLike?.(post.id)}
            loading={loadingLike}
            style={styles.likeButton}
          >
            <View style={styles.actionLabel}>
              <AppText style={styles.likeText}>{post.likes.length} like</AppText>
            </View>
          </AppButton>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={() => onToggleLike?.(post.id)} style={styles.iconAction}>
            <Heart color={liked ? colors.danger : colors.textMuted} fill={liked ? colors.danger : 'transparent'} size={19} />
            <AppText variant="caption" muted>
              Like
            </AppText>
          </Pressable>
          <Pressable onPress={() => router.push(`/post/${post.id}`)} style={styles.comment}>
            <MessageCircle color={colors.textMuted} size={18} />
            <AppText variant="caption" muted>
              Details
            </AppText>
          </Pressable>
          <Pressable onPress={() => Alert.alert('Pickup info', post.purchaseAddress ?? 'No pickup location added.')} style={styles.comment}>
            <ShoppingBag color={colors.textMuted} size={18} />
            <AppText variant="caption" muted>
              {post.price ? `$${post.price}` : 'Pickup'}
            </AppText>
          </Pressable>
          <Pressable onPress={() => Alert.alert('Saved', `${post.sneakerName} was added to your saved list.`)}>
            <Bookmark color={colors.textMuted} size={18} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    ...shadow,
  },
  pressed: {
    opacity: 0.82,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: '800',
  },
  moreButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
  },
  postImage: {
    height: 390,
    marginHorizontal: spacing.md,
    borderRadius: radius.lg,
  },
  body: {
    gap: spacing.md,
    padding: spacing.md,
  },
  captionBlock: {
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  captionLabel: {
    fontWeight: '900',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  descriptionPill: {
    flex: 1,
    minHeight: 58,
    justifyContent: 'center',
    borderRadius: radius.md,
    borderColor: colors.accentBorder,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  pillAccent: {
    fontSize: 17,
    fontWeight: '900',
  },
  likeText: {
    fontSize: 16,
    fontWeight: '800',
  },
  likeButton: {
    minWidth: 110,
    minHeight: 58,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  actionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
