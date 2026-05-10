import { StyleSheet } from 'react-native';

import { AppImage } from './AppImage';

export const IntroHero = () => (
  <AppImage source={require('../../assets/source-images/icon_sent3.png')} style={styles.image} contentFit="contain" />
);

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 220,
    backgroundColor: 'transparent',
  },
});
