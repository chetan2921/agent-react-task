import { StyleSheet, View } from 'react-native';

import { colors, radius, shadow } from '@/theme';
import type { User } from '@/types/domain';
import { AppImage } from './AppImage';
import { AppText } from './AppText';

export const Avatar = ({ user, size = 58 }: { user?: User; size?: number }) => {
  const letter = user?.username?.charAt(0).toUpperCase() ?? 'S';

  if (user?.profilePhoto || user?.profilePhotoSource) {
    return (
      <AppImage
        uri={user.profilePhoto}
        source={user.profilePhotoSource}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        contentFit="cover"
      />
    );
  }

  return (
    <View style={[styles.initials, { width: size, height: size, borderRadius: size / 2 }]}>
      <AppText accent style={[styles.letter, { fontSize: Math.max(18, size * 0.36) }]}>
        {letter}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  initials: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.accent,
    borderWidth: 3,
    ...shadow,
  },
  letter: {
    fontWeight: '800',
  },
});
