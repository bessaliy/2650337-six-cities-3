import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MainPage from './main-page';
import { getFilteredOffers } from '../../../store/selectors';

type MockState = {
  offers: {
    city: {
      name: string;
      location: {
        latitude: number;
        longitude: number;
        zoom: number;
      };
    };
    isLoading: boolean;
  };
};

let mockState: MockState;

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: MockState) => unknown) =>
    selector(mockState),
}));

vi.mock('../../../store/selectors.ts', () => ({
  getFilteredOffers: vi.fn(),
}));

vi.mock('../../layout/header.tsx', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('./locations.tsx', () => ({
  default: () => <div data-testid="locations" />,
}));

vi.mock('./places-sorting.tsx', () => ({
  default: () => <div data-testid="sorting" />,
}));

vi.mock('../../place-card/place-card-list.tsx', () => ({
  default: () => <div data-testid="place-card-list" />,
}));

vi.mock('../../map/map.tsx', () => ({
  default: () => <div data-testid="map" />,
}));

vi.mock('./no-offers-found.tsx', () => ({
  default: () => <div data-testid="no-offers" />,
}));

vi.mock('../../ui/spinner/spinner.tsx', () => ({
  default: () => <div data-testid="spinner" />,
}));

describe('Component: MainPage', () => {

  beforeEach(() => {
    mockDispatch.mockReset();

    mockState = {
      offers: {
        city: {
          name: 'Paris',
          location: {
            latitude: 0,
            longitude: 0,
            zoom: 1,
          },
        },
        isLoading: false,
      },
    };
  });

  it('should render spinner when loading', () => {
    mockState.offers.isLoading = true;

    vi.mocked(getFilteredOffers).mockReturnValue([]);

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render empty state when no offers', () => {
    vi.mocked(getFilteredOffers).mockReturnValue([]);

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('no-offers')).toBeInTheDocument();
  });

  it('should render list and map when offers exist', () => {
    vi.mocked(getFilteredOffers).mockReturnValue([{}, {}] as never);

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('place-card-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should dispatch fetchOffers on mount', () => {
    vi.mocked(getFilteredOffers).mockReturnValue([]);

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalled();
  });
});
