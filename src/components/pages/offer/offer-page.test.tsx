import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import OfferPage from './offer-page';
import {
  getCurrentOffer,
  getNearbyOffers,
  getReviews,
  getIsOfferLoading,
} from '../../../store/selectors';
import { AuthStatus } from '../../../const';

const mockDispatch = vi.fn();

const mockState = {
  user: {
    authorizationStatus: AuthStatus.NoAuth,
  },
};

const mockFullData = () => {
  vi.mocked(getIsOfferLoading).mockReturnValue(false);

  vi.mocked(getCurrentOffer).mockReturnValue({
    id: '1',
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 1 } },
    images: [],
  } as never);

  vi.mocked(getNearbyOffers).mockReturnValue([]);
  vi.mocked(getReviews).mockReturnValue([]);
};

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: typeof mockState) => unknown) =>
    selector(mockState),
}));

vi.mock('../../../store/selectors.ts', () => ({
  getCurrentOffer: vi.fn(),
  getNearbyOffers: vi.fn(),
  getReviews: vi.fn(),
  getIsOfferLoading: vi.fn(),
}));


vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ id: '1' })),
  };
});

vi.mock('../../layout/header.tsx', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('../../place-card/place-card.tsx', () => ({
  default: () => <div data-testid="place-card" />,
}));

vi.mock('../../map/map.tsx', () => ({
  default: () => <div data-testid="map" />,
}));

vi.mock('./offer-info.tsx', () => ({
  default: () => <div data-testid="offer-info" />,
}));

vi.mock('./reviews-list.tsx', () => ({
  default: () => <div data-testid="reviews" />,
}));

vi.mock('./offer-gallery.tsx', () => ({
  default: () => <div data-testid="gallery" />,
}));

vi.mock('../../ui/spinner/spinner.tsx', () => ({
  default: () => <div data-testid="spinner" />,
}));

describe('Component: OfferPage', () => {

  beforeEach(() => {
    mockDispatch.mockReset();
  });

  it('should render spinner when loading', () => {
    vi.mocked(getIsOfferLoading).mockReturnValue(true);
    vi.mocked(getNearbyOffers).mockReturnValue([]);

    render(
      <MemoryRouter>
        <OfferPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect when no offer', () => {
    vi.mocked(getIsOfferLoading).mockReturnValue(false);
    vi.mocked(getCurrentOffer).mockReturnValue(null);
    vi.mocked(getNearbyOffers).mockReturnValue([]);

    render(
      <MemoryRouter>
        <OfferPage />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('offer-info')).not.toBeInTheDocument();
  });

  it('should render offer page when data loaded', () => {
    mockFullData();

    render(
      <MemoryRouter>
        <OfferPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('offer-info')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should dispatch fetch actions on mount', () => {
    mockFullData();

    render(
      <MemoryRouter>
        <OfferPage />
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalled();
  });

});
