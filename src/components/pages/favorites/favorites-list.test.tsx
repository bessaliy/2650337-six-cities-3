import {render, screen} from '@testing-library/react';
import {vi} from 'vitest';
vi.mock('./favorites-city-group.tsx', () => ({
  default: () => <div data-testid="favorites-city-group" />,
}));
import FavoritesList from './favorites-list.tsx';
import {FavoritesGroup} from '../../../types/favorites-group.ts';

const favorites = [
  {
    city: 'Paris',
    offers: [],
  },
  {
    city: 'Cologne',
    offers: [],
  },
  {
    city: 'Brussels',
    offers: [],
  },
] as FavoritesGroup[];

describe('Component: FavoritesList', () => {
  it('should render correct number of favorite groups', () => {
    render(<FavoritesList favorites={favorites} />);

    expect(screen.getAllByTestId('favorites-city-group')).toHaveLength(favorites.length);
    expect(screen.getByText(/saved listing/i)).toBeInTheDocument();
  });
});
