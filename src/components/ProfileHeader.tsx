import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';
import type { User } from '@/types/domain';
import { Avatar } from './Avatar';
import { AppText } from './AppText';

export const ProfileHeader = ({
  user,
  isCurrentUser = false,
}: {
  user: User;
  isCurrentUser?: boolean;
}) => (
  <View style={styles.wrap}>
    <Avatar user={user} size={112} />
    <View style={styles.info}>
      <AppText variant="heading">{user.username}</AppText>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <AppText variant="subheading">{user.postCount ?? 0}</AppText>
          <AppText variant="caption" muted>
            Posts
          </AppText>
        </View>
        <Pressable
          style={styles.stat}
          onPress={() => router.push(isCurrentUser ? '/profile/followers' : `/user/${user.id}/followers`)}
        >
          <AppText variant="subheading">{user.followers}</AppText>
          <AppText variant="caption" muted>
            Followers
          </AppText>
        </Pressable>
        <Pressable
          style={styles.stat}
          onPress={() => router.push(isCurrentUser ? '/profile/following' : `/user/${user.id}/following`)}
        >
          <AppText variant="subheading">{user.following}</AppText>
          <AppText variant="caption" muted>
            Following
          </AppText>
        </Pressable>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.xl,
  },
  info: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.28)',
    borderWidth: StyleSheet.hairlineWidth,
  },
  stat: {
    minWidth: 96,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
});
