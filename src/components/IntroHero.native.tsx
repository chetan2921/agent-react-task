import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';

import { animationAssets } from '@/data/mockData';

export const IntroHero = () => <LottieView source={animationAssets.sneaker} autoPlay loop style={styles.animation} />;

const styles = StyleSheet.create({
  animation: {
    width: 280,
    height: 280,
  },
});
