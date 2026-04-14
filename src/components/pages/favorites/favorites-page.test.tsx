import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import FavoritesPage from './favorites-page';
import {getFavoritesOffers} from '../../../store/selectors.ts';


type MockState = {
  favorites: {
    favorites: unknown[];
    isLoading: boolean;
  };
};

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: MockState) => unknown) =>
    mockUseSelector(selector) as ReturnType<typeof selector>,
}));

vi.mock('../../layout/header.tsx', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('./favorites-list.tsx', () => ({
  default: () => <div data-testid="favorites-list" />,
}));

vi.mock('./favorites-empty.tsx', () => ({
  default: () => <div data-testid="favorites-empty" />,
}));

vi.mock('../../ui/spinner/spinner.tsx', () => ({
  default: () => <div data-testid="spinner" />,
}));
vi.mock('../../../store/selectors.ts', () => ({
  getFavoritesOffers: vi.fn(() => []),
}));

describe('Component: FavoritesPage', () => {

  beforeEach(() => {
    mockUseSelector.mockReset();
    mockDispatch.mockReset();
  });

  it('should render spinner when loading', () => {
    mockUseSelector.mockImplementation((selector: (state: MockState) => unknown) =>
      selector({
        favorites: {
          favorites: [],
          isLoading: true,
        },
      })
    );

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render empty when no favorites', () => {
    mockUseSelector.mockImplementation((selector: (state: MockState) => unknown) =>
      selector({
        favorites: {
          favorites: [],
          isLoading: false,
        },
      })
    );

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
  });

  it('should render list when favorites exist', () => {
    vi.mocked(getFavoritesOffers).mockReturnValue([
      {
        city: 'Paris',
        offers: [],
      },
    ]);
    mockUseSelector.mockImplementation((selector: (state: MockState) => unknown) =>
      selector({
        favorites: {
          favorites: [1, 2],
          isLoading: false,
        },
      })
    );

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('favorites-list')).toBeInTheDocument();
  });

  it('should dispatch fetchFavorites on mount', () => {
    mockUseSelector.mockImplementation((selector: (state: MockState) => unknown) =>
      selector({
        favorites: {
          favorites: [],
          isLoading: false,
        },
      })
    );

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalled();
  });

});
