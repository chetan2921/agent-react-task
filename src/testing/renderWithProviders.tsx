import { render } from '@testing-library/react-native';
import { ReactElement } from 'react';

import { AppProviders } from '@/providers/AppProviders';

export const renderWithProviders = (ui: ReactElement) => render(<AppProviders>{ui}</AppProviders>);
