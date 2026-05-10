import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { useAuth } from '@/providers/AppProviders';
import { colors, spacing } from '@/theme';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Username, email, and password are required.');
      return;
    }
    setLoading(true);
    try {
      await register(username.trim(), email.trim(), password);
      router.replace('/feed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppScreen contentStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="title">Create account</AppText>
        <AppText muted>Mock registration creates a local user and signs you in.</AppText>
      </View>
      <View style={styles.form}>
        <AppInput label="Username" value={username} onChangeText={setUsername} placeholder="solecollector" />
        <AppInput
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
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
          Create account
        </AppButton>
      </View>
      <Pressable onPress={() => router.back()} style={styles.linkWrap}>
        <AppText muted>Already have an account? </AppText>
        <AppText style={styles.link}>Sign in</AppText>
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
  linkWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    color: colors.accent,
    fontWeight: '700',
  },
});
