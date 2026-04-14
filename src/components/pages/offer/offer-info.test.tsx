import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import OfferInfo from './offer-info';
import { AuthStatus } from '../../../const';
import {DetailedOffer} from '../../../types/offer.ts';

const mockOffer = {
  id: '1',
  title: 'Nice apartment',
  isFavorite: false,
  isPremium: true,
  rating: 4,
  type: 'apartment',
  bedrooms: 2,
  maxAdults: 3,
  price: 120,
  goods: ['Wi-Fi', 'Kitchen'],
  description: 'Very good place',
  host: {
    name: 'John',
    avatarUrl: 'img.jpg',
    isPro: true,
  },
} as DetailedOffer;

let authStatus: AuthStatus = AuthStatus.NoAuth;

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector: (state: unknown) => unknown) =>
    selector({
      user: {
        authorizationStatus: authStatus,
      },
    }),
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Component: OfferInfo', () => {

  beforeEach(() => {
    mockDispatch.mockReset();
    mockNavigate.mockReset();
  });

  it('should render offer data', () => {
    render(<OfferInfo data={mockOffer} />);

    expect(screen.getByText('Nice apartment')).toBeInTheDocument();
    expect(screen.getByText('€120')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
  });

  it('should render premium mark', () => {
    render(<OfferInfo data={mockOffer} />);

    expect(screen.getByText(/premium/i)).toBeInTheDocument();
  });

  it('should navigate to login if not authorized', () => {
    render(<OfferInfo data={mockOffer} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should dispatch toggleFavorites if authorized', () => {
    authStatus = AuthStatus.Auth;

    render(<OfferInfo data={mockOffer} />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

});
