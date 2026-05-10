import { Tabs } from 'expo-router';
import { Compass, Home, PlusSquare, User } from 'lucide-react-native';

import { colors } from '@/theme';

const tabIcon = (Icon: typeof Home) =>
  function IconRenderer({ color, size, focused }: { color: string; size: number; focused: boolean }) {
    return <Icon color={focused ? colors.primary : color} size={size} strokeWidth={focused ? 2.8 : 2.2} />;
  };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          left: 22,
          right: 22,
          bottom: 18,
          height: 78,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 28,
          backgroundColor: 'rgba(20, 22, 22, 0.96)',
          borderColor: colors.border,
          borderWidth: 1,
          shadowColor: colors.accent,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.22,
          shadowRadius: 18,
          elevation: 12,
        },
        tabBarItemStyle: {
          borderRadius: 24,
          marginHorizontal: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen name="feed" options={{ title: 'Home', tabBarIcon: tabIcon(Home) }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: tabIcon(Compass) }} />
      <Tabs.Screen name="create" options={{ title: 'Create', tabBarIcon: tabIcon(PlusSquare) }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: tabIcon(User) }} />
    </Tabs>
  );
}
