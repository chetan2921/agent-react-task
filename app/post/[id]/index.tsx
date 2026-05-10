import { router, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import { Alert, StyleSheet, View } from 'react-native';
import { ArrowLeft, ExternalLink, Info, MoreVertical, Share2, Trash2 } from 'lucide-react-native';

import { AppButton } from '@/components/AppButton';
import { AppImage } from '@/components/AppImage';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { Avatar } from '@/components/Avatar';
import { ErrorState, LoadingState } from '@/components/StateViews';
import { useDeletePost, usePost, useToggleLike } from '@/hooks/useAppData';
import { useAuth } from '@/providers/AppProviders';
import { colors, radius, spacing } from '@/theme';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentUser } = useAuth();
  const post = usePost(id);
  const toggleLike = useToggleLike();
  const deletePost = useDeletePost();

  if (post.isLoading) {
    return (
      <AppScreen>
        <LoadingState label="Loading post" />
      </AppScreen>
    );
  }

  if (post.isError || !post.data) {
    return (
      <AppScreen>
        <ErrorState message="The post could not be loaded." onRetry={() => post.refetch()} />
      </AppScreen>
    );
  }

  const item = post.data;
  const owned = item.userId === currentUser?.id;

  const remove = async () => {
    await deletePost.mutateAsync(item.id);
    router.back();
  };

  return (
    <AppScreen scroll>
      <View style={styles.header}>
        <AppButton variant="ghost" onPress={() => router.back()} style={styles.iconOnly}>
          <ArrowLeft color={colors.primary} size={34} />
        </AppButton>
        <AppText variant="title" style={styles.centerTitle}>Post Details</AppText>
        <AppButton variant="ghost" onPress={() => Alert.alert('Share', 'Sharing will be wired when native sharing is added.')} style={styles.iconOnly}>
          <Share2 color={colors.accent} size={30} />
        </AppButton>
      </View>
      <View style={styles.userCard}>
        <Avatar user={item.user} size={74} />
        <View style={styles.userText}>
          <AppText variant="heading">{item.user?.username ?? 'Sneakerhead'}</AppText>
          <AppText muted>33w ago</AppText>
        </View>
        <View style={styles.menuButton}>
          <MoreVertical color={colors.textMuted} size={30} />
        </View>
      </View>
      <AppImage uri={item.mainImage} source={item.mainImageSource} style={styles.image} />
      <View style={styles.panel}>
        <AppText variant="heading">{item.likes.length} like ❤️</AppText>
        <View style={styles.descriptionRow}>
          <AppText variant="subheading" accent>Description:</AppText>
          <AppText style={styles.descriptionText}>{item.description}</AppText>
        </View>
        <View style={styles.actions}>
          <AppButton variant="secondary" onPress={() => toggleLike.mutate(item.id)} loading={toggleLike.isPending}>
            {currentUser && item.likes.includes(currentUser.id) ? 'Unlike' : 'Like'} · {item.likes.length}
          </AppButton>
          {item.purchaseLink ? (
            <AppButton variant="secondary" onPress={() => Linking.openURL(item.purchaseLink!)}>
              <View style={styles.iconLabel}>
                <ExternalLink color={colors.text} size={16} />
                <AppText>Open link</AppText>
              </View>
            </AppButton>
          ) : null}
          {owned ? (
            <AppButton variant="danger" onPress={remove} loading={deletePost.isPending}>
              <View style={styles.iconLabel}>
                <Trash2 color={colors.primaryText} size={16} />
                <AppText style={styles.dangerLabel}>Delete</AppText>
              </View>
            </AppButton>
          ) : null}
        </View>
      </View>
      <View style={styles.detailsCard}>
        <View style={styles.detailsTitle}>
          <View style={styles.infoIcon}>
            <Info color={colors.primary} size={25} />
          </View>
          <AppText variant="heading">Sneaker Details</AppText>
        </View>
        <View style={styles.detailField}>
          <AppText variant="subheading" accent>Brand :</AppText>
          <AppText variant="subheading">{item.brandName.toLowerCase()}</AppText>
        </View>
        <View style={styles.detailField}>
          <AppText variant="subheading" accent>Name :</AppText>
          <AppText variant="subheading">{item.sneakerName.toLowerCase()}</AppText>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  iconOnly: {
    width: 52,
    minHeight: 52,
    paddingHorizontal: 0,
  },
  centerTitle: {
    fontWeight: '900',
    fontSize: 24,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 118,
    marginVertical: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
  },
  userText: {
    flex: 1,
  },
  menuButton: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
  },
  image: {
    height: 640,
    borderRadius: radius.lg,
  },
  panel: {
    gap: spacing.lg,
    marginVertical: spacing.xl,
    padding: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
  },
  descriptionRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  descriptionText: {
    flex: 1,
  },
  actions: {
    gap: spacing.md,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dangerLabel: {
    color: colors.primaryText,
  },
  detailsCard: {
    gap: spacing.xl,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(17, 32, 31, 0.72)',
    borderColor: colors.accentBorder,
    borderWidth: 1,
  },
  detailsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoIcon: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.accentBlue,
  },
  detailField: {
    flexDirection: 'row',
    gap: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.input,
    borderColor: colors.border,
    borderWidth: 1,
  },
});
