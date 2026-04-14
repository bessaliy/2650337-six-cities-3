import { describe, it, expect } from 'vitest';
import {
  getReviews,
  getFilteredOffers,
  getFavoritesOffers,
} from './selectors';
import { RootState } from '../store';
import { Review } from '../types/review';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import {AuthStatus} from '../const.ts';

function createMockState(partial: Partial<RootState>): RootState {
  return {
    offers: {
      offers: [],
      city: {
        name: '',
        location: { latitude: 0, longitude: 0, zoom: 1 },
      },
      isLoading: false,
    },
    offerDetails: {
      currentOffer: null,
      nearbyOffers: [],
      isOfferLoading: false,
    },
    reviews: {
      reviews: [],
      isReviewSubmitting: false,
      isReviewSubmitSuccess: false,
      reviewError: null,
    },
    user: {
      authorizationStatus: AuthStatus.NoAuth,
      loginError: null,
      userEmail: '',
    },
    favorites: {
      favorites: [],
      isLoading: false,
    },
    ...partial,
  };
}

describe('Selectors', () => {

  it('should sort reviews by date (newest first)', () => {
    const state = createMockState({
      reviews: {
        reviews: [
          { id: '1', date: '2020-01-01' } as Review,
          { id: '2', date: '2022-01-01' } as Review,
          { id: '3', date: '2021-01-01' } as Review,
        ],
        isReviewSubmitting: false,
        isReviewSubmitSuccess: false,
        reviewError: null,
      },
    });

    const result = getReviews(state);

    expect(result.map((r) => r.id)).toEqual(['2', '3', '1']);
  });

  it('should filter offers by city', () => {
    const paris: City = {
      name: 'Paris',
      location: { latitude: 0, longitude: 0, zoom: 1 },
    };

    const london: City = {
      name: 'London',
      location: { latitude: 0, longitude: 0, zoom: 1 },
    };

    const state = createMockState({
      offers: {
        offers: [
          { id: '1', city: paris } as Offer,
          { id: '2', city: london } as Offer,
        ],
        city: paris,
        isLoading: false,
      },
    });

    const result = getFilteredOffers(state);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should group favorites by city', () => {
    const paris: City = {
      name: 'Paris',
      location: { latitude: 0, longitude: 0, zoom: 1 },
    };

    const london: City = {
      name: 'London',
      location: { latitude: 0, longitude: 0, zoom: 1 },
    };

    const state = createMockState({
      favorites: {
        favorites: [
          { id: '1', city: paris } as Offer,
          { id: '2', city: paris } as Offer,
          { id: '3', city: london } as Offer,
        ],
        isLoading: false,
      },
    });

    const result = getFavoritesOffers(state);

    expect(result).toEqual([
      {
        city: 'Paris',
        offers: [
          { id: '1', city: paris },
          { id: '2', city: paris },
        ],
      },
      {
        city: 'London',
        offers: [
          { id: '3', city: london },
        ],
      },
    ]);
  });

});
