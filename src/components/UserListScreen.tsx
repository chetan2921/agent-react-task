import { router } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';
import type { User } from '@/types/domain';
import { AppButton } from './AppButton';
import { AppScreen } from './AppScreen';
import { AppText } from './AppText';
import { EmptyState, ErrorState, LoadingState } from './StateViews';
import { UserRow } from './UserRow';

export const UserListScreen = ({
  title,
  users,
  loading,
  error,
  onRetry,
}: {
  title: string;
  users: User[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
}) => {
  if (loading) {
    return (
      <AppScreen>
        <LoadingState label={`Loading ${title.toLowerCase()}`} />
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <ErrorState message={`${title} could not be loaded.`} onRetry={onRetry} />
      </AppScreen>
    );
  }

  return (
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.header}>
        <AppButton variant="ghost" onPress={() => router.back()} style={styles.backButton}>
          Back
        </AppButton>
        <AppText variant="title">{title}</AppText>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <UserRow user={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState title={`No ${title.toLowerCase()}`} />}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  header: {
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  separator: {
    height: spacing.md,
  },
});
