import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty.tsx';

describe('Component: FavoritesEmpty', () => {
  it('should render FavoritesEmpty correct', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
