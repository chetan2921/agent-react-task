import { Image } from 'expo-image';
import { ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '@/theme';

type AppImageProps = {
  uri?: string;
  source?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  contentFit?: 'cover' | 'contain';
};

export const AppImage = ({ uri, source, style, contentFit = 'cover' }: AppImageProps) => {
  const imageSource = source ?? (uri ? { uri } : undefined);

  return (
    <View style={[styles.frame, style]}>
      {imageSource ? (
        <Image source={imageSource} style={StyleSheet.absoluteFill} contentFit={contentFit} transition={180} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
  },
});
