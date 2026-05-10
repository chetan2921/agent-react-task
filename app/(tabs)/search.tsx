import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ArrowLeft, Dumbbell, Search, Users } from 'lucide-react-native';

import { AppInput } from '@/components/AppInput';
import { AppScreen } from '@/components/AppScreen';
import { AppText } from '@/components/AppText';
import { EmptyState, LoadingState } from '@/components/StateViews';
import { SneakerCard } from '@/components/SneakerCard';
import { UserRow } from '@/components/UserRow';
import { useSearch } from '@/hooks/useAppData';
import { colors, radius, spacing } from '@/theme';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query ?? '');
  const results = useSearch(query);

  useEffect(() => {
    if (typeof params.query === 'string') {
      setQuery(params.query);
    }
  }, [params.query]);

  const hasResults = Boolean(results.data?.sneakers.length || results.data?.users.length);

  return (
    <AppScreen contentStyle={styles.screen}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={colors.primary} size={34} />
          </Pressable>
          <AppText variant="title" accent style={styles.title}>Discover</AppText>
        </View>
        <View style={styles.searchWrap}>
          <Search color={colors.textMuted} size={28} />
          <AppInput value={query} onChangeText={setQuery} placeholder="Search sneakers..." autoCapitalize="none" style={styles.searchInput} />
        </View>
        <View style={styles.tabs}>
          <Pressable onPress={() => Alert.alert('Sneakers', 'Showing sneaker results.')} style={styles.tabItem}>
            <Dumbbell color={colors.accent} size={26} />
            <AppText accent style={styles.tabText}>Sneakers</AppText>
            <View style={styles.tabUnderline} />
          </Pressable>
          <Pressable onPress={() => Alert.alert('Users', 'User filtering can be wired as the next step.')} style={styles.tabItem}>
            <Users color={colors.textMuted} size={26} />
            <AppText muted style={styles.tabText}>Users</AppText>
          </Pressable>
        </View>
      </View>
      {results.isLoading ? (
        <LoadingState label="Searching" />
      ) : !hasResults ? (
        <EmptyState title="No results" body="Try a brand like Nike, Adidas, PUMA, Converse, or New Balance." />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          data={[...(results.data?.sneakers ?? []), ...(results.data?.users ?? [])]}
          keyExtractor={(item) => `${'sneakerName' in item ? 'sneaker' : 'user'}-${item.id}`}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          renderItem={({ item }) => 'sneakerName' in item ? <SneakerCard sneaker={item} compact /> : <UserRow user={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={null}
        />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  header: {
    gap: spacing.lg,
    paddingVertical: spacing.lg,
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomColor: colors.textMuted,
    borderBottomWidth: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
  },
  backButton: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 70,
    borderRadius: radius.xl,
    backgroundColor: colors.input,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    gap: spacing.xs,
    minWidth: 140,
  },
  tabText: {
    fontWeight: '800',
  },
  tabUnderline: {
    width: 70,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  list: {
    paddingTop: spacing.xl,
    paddingBottom: 130,
  },
  separator: {
    height: spacing.xl,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
});
