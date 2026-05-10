import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Grid3X3, Heart, MoreVertical } from 'lucide-react-native';

import { AppButton } from '@/components/AppButton';
import { AppImage } from '@/components/AppImage';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { EmptyState, LoadingState } from '@/components/StateViews';
import { ProfileHeader } from '@/components/ProfileHeader';
import { useUserPosts } from '@/hooks/useAppData';
import { useAuth } from '@/providers/AppProviders';
import { colors, gradients, radius, spacing } from '@/theme';
import type { Post } from '@/types/domain';

export default function ProfileScreen() {
  const { currentUser, logout } = useAuth();
  const posts = useUserPosts(currentUser?.id ?? 'missing');

  if (!currentUser) {
    return (
      <AppScreen>
        <EmptyState title="Not signed in" actionLabel="Go to login" onAction={() => router.replace('/login')} />
      </AppScreen>
    );
  }

  const signOut = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <AppScreen contentStyle={styles.screen}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        data={posts.data ?? []}
        keyExtractor={(item: Post) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postTile}>
            <AppImage uri={item.mainImage} source={item.mainImageSource} style={styles.tileImage} />
            <View style={styles.tileOverlay}>
              <AppText>{item.likes.length === 0 ? '♡' : '❤️'} {item.likes.length}</AppText>
              <AppText>{item.description.split(' ')[0] ?? item.sneakerName}</AppText>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <>
            <LinearGradient colors={gradients.profile} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
              <Pressable onPress={() => Alert.alert('Profile options', 'Profile edit and settings can be wired here.')} style={styles.menu}>
                <MoreVertical color={colors.primary} size={30} />
              </Pressable>
              <ProfileHeader user={currentUser} isCurrentUser />
              <AppButton variant="secondary" onPress={signOut} style={styles.signOut}>
                Sign out
              </AppButton>
            </LinearGradient>
            <View style={styles.profileTabs}>
              <Pressable onPress={() => Alert.alert('Posts', 'Showing your posts.')} style={styles.profileTabActive}>
                <Grid3X3 color={colors.primary} size={28} />
                <AppText variant="subheading">Posts</AppText>
                <View style={styles.profileUnderline} />
              </Pressable>
              <Pressable onPress={() => Alert.alert('Liked', 'Liked posts can be wired after the backend is connected.')} style={styles.profileTab}>
                <Heart color={colors.textMuted} size={30} />
                <AppText variant="subheading" muted>Liked</AppText>
              </Pressable>
            </View>
          </>
        }
        ListEmptyComponent={posts.isLoading ? <LoadingState /> : <EmptyState title="No posts yet" body="Create a post from the Post tab." />}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  list: {
    paddingBottom: 130,
    paddingHorizontal: spacing.md,
  },
  header: {
    minHeight: 420,
    marginHorizontal: -spacing.md,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  menu: {
    alignSelf: 'flex-end',
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    backgroundColor: 'rgba(20, 12, 22, 0.7)',
  },
  signOut: {
    alignSelf: 'center',
    minHeight: 42,
    paddingHorizontal: spacing.lg,
  },
  profileTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -spacing.md,
    marginBottom: spacing.lg,
    borderBottomColor: colors.textMuted,
    borderBottomWidth: 1,
  },
  profileTabActive: {
    alignItems: 'center',
    gap: spacing.xs,
    minWidth: 140,
    paddingVertical: spacing.md,
  },
  profileTab: {
    alignItems: 'center',
    gap: spacing.xs,
    minWidth: 140,
    paddingVertical: spacing.md,
  },
  profileUnderline: {
    width: 70,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  postTile: {
    width: '48%',
    height: 180,
    overflow: 'hidden',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  tileImage: {
    flex: 1,
  },
  tileOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
  },
  separator: {
    height: 0,
  },
});
