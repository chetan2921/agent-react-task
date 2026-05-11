import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { GradientText } from '@/components/GradientText';
import { useAuth } from '@/providers/AppProviders';
import { colors, spacing } from '@/theme';

export default function LoginScreen() {
  const { login } = useAuth();
  const [userId, setUserId] = useState('chetan123');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    if (!userId.trim() || !password.trim()) {
      setError('User ID and password are required.');
      return;
    }
    setLoading(true);
    try {
      await login(userId.trim(), password);
      router.replace('/feed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.header}>
        <GradientText>Welcome back</GradientText>
        <AppText muted>Enter any user ID and password to continue in mock mode.</AppText>
      </View>
      <View style={styles.form}>
        <View style={styles.demoCard}>
          <AppText style={styles.demoTitle}>Mock login</AppText>
          <AppText muted>Any non-empty user ID and password will sign you in.</AppText>
        </View>
        <AppInput
          label="User ID"
          autoCapitalize="none"
          value={userId}
          onChangeText={setUserId}
          placeholder="chetan123"
        />
        <AppInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          error={error}
        />
        <AppButton onPress={submit} loading={loading}>
          Sign in
        </AppButton>
      </View>
      <Pressable onPress={() => router.push('/register')} style={styles.linkWrap}>
        <AppText muted>New to SoleHead? </AppText>
        <AppText style={styles.link}>Create an account</AppText>
      </Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    gap: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
  },
  form: {
    gap: spacing.lg,
  },
  demoCard: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: 'rgba(38, 248, 255, 0.08)',
    borderColor: colors.accentBorder,
    borderWidth: StyleSheet.hairlineWidth,
  },
  demoTitle: {
    fontWeight: '900',
  },
  linkWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    color: colors.accent,
    fontWeight: '700',
  },
});
