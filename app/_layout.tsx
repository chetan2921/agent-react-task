import { Stack, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProviders, useAuth } from '@/providers/AppProviders';
import { colors } from '@/theme';

const RootGate = () => {
  const { isReady, isFirstTime, isLoggedIn } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const firstSegment = segments[0];
    const inAuthGroup = firstSegment === '(auth)';
    const inTabsGroup = firstSegment === '(tabs)';

    if (isFirstTime && firstSegment !== 'intro') {
      router.replace('/intro');
      return;
    }

    if (!isFirstTime && !isLoggedIn && !inAuthGroup) {
      router.replace('/login');
      return;
    }

    if (!isFirstTime && isLoggedIn && (inAuthGroup || firstSegment === 'intro' || !firstSegment)) {
      router.replace('/feed');
      return;
    }

    if (!isFirstTime && isLoggedIn && inTabsGroup) {
      return;
    }
  }, [isFirstTime, isLoggedIn, isReady, segments]);

  if (!isReady) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        <Stack.Screen name="intro" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="post/[id]" />
        <Stack.Screen name="sneaker/[id]" />
        <Stack.Screen name="user/[id]" />
        <Stack.Screen name="profile/followers" />
        <Stack.Screen name="profile/following" />
      </Stack>
    </>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AppProviders>
          <RootGate />
        </AppProviders>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
