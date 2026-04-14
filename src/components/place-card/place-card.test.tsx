import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import PlaceCard from './place-card';
import { AuthStatus } from '../../const';
import {Offer} from '../../types/offer.ts';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: () => AuthStatus.Auth,
}));

describe('Component: PlaceCard', () => {
  const mockOffer = {
    id: '1',
    title: 'Test title',
    type: 'apartment',
    price: 100,
    rating: 4,
    isFavorite: false,
    isPremium: false,
    previewImage: 'img.jpg',
  } as Offer;

  it('should call onHoverToggle on mouse enter and leave', () => {
    const mockHover = vi.fn();

    const { container } = render(
      <MemoryRouter>
        <PlaceCard
          data={mockOffer}
          onHoverToggle={mockHover}
          viewMode="CitiesView"
        />
      </MemoryRouter>
    );

    const card = container.querySelector('.place-card')!;

    fireEvent.mouseEnter(card);
    expect(mockHover).toHaveBeenCalledWith('1');

    fireEvent.mouseLeave(card);
    expect(mockHover).toHaveBeenCalledWith(null);
  });
});
