import { render, screen, waitFor } from '@testing-library/react-native';

import LoginScreen from '../app/(auth)/login';
import ExploreScreen from '../app/(tabs)/explore';
import { AppProviders } from '@/providers/AppProviders';

describe('screens', () => {
  it('renders login screen', async () => {
    render(
      <AppProviders>
        <LoginScreen />
      </AppProviders>,
    );

    await waitFor(() => expect(screen.getByText('Welcome back')).toBeTruthy());
    expect(screen.getByText('Sign in')).toBeTruthy();
  });

  it('renders explore catalog data', async () => {
    render(
      <AppProviders>
        <ExploreScreen />
      </AppProviders>,
    );

    await waitFor(() => expect(screen.getByText('📈 Trending')).toBeTruthy());
    expect(screen.getAllByText('Samba OG').length).toBeGreaterThan(0);
  });
});
