import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../place-card/place-card', () => ({
  default: () => <div data-testid="place-card" />,
}));

import FavoritesCityGroup from './favorites-city-group';
import {Offer} from '../../../types/offer.ts';

const offers = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
] as Offer[];

describe('Component: FavoritesCityGroup', () => {
  it('should render city name correctly', () => {
    render(
      <BrowserRouter>
        <FavoritesCityGroup offers={offers} city="Paris" />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /paris/i })).toBeInTheDocument();
  });

  it('should render correct number of place cards', () => {
    render(
      <BrowserRouter>
        <FavoritesCityGroup offers={offers} city="Paris" />
      </BrowserRouter>
    );

    expect(screen.getAllByTestId('place-card')).toHaveLength(offers.length);
  });
});
