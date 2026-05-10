import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';
import type { User } from '@/types/domain';
import { Avatar } from './Avatar';
import { AppText } from './AppText';

export const UserRow = ({ user }: { user: User }) => (
  <Pressable
    accessibilityRole="button"
    onPress={() => router.push(`/user/${user.id}`)}
    style={({ pressed }) => [styles.row, pressed && styles.pressed]}
  >
    <Avatar user={user} size={52} />
    <View style={styles.text}>
      <AppText variant="subheading">{user.username}</AppText>
      <AppText variant="caption" muted>
        {user.followers} followers · {user.totalSneakerCount} sneakers
      </AppText>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  pressed: {
    opacity: 0.74,
  },
  text: {
    flex: 1,
  },
});
