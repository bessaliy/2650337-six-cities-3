import offerDetailsReducer from './offer-details-slice.ts';
import {fetchDetailedOffer, fetchNearbyOffers, toggleFavorites} from '../api-actions.ts';
import {MockData, MockDetailedOffer} from '../../mock/mock-data.ts';
import {DetailedOffer, Offer} from '../../types/offer.ts';

describe('offersDetailsSlice reducer', () => {
  const initialState = {
    currentOffer: null,
    nearbyOffers: [],
    isOfferLoading: true,
  };
  it('should return initial state with empty action', () => {
    const result = offerDetailsReducer(undefined, {type: ''});

    expect(result).toEqual(initialState);
  });
  it('should set current offer on fetchDetailedOffer pending', () => {
    const action = fetchDetailedOffer.pending('', '');
    const result = offerDetailsReducer(initialState, action);

    expect(result.isOfferLoading).toBe(true);
    expect(result.currentOffer).toBe(null);
  });
  it('should set current offer on fetchDetailedOffer fulfilled', () => {
    const action = fetchDetailedOffer.fulfilled(MockDetailedOffer, '', '');
    const result = offerDetailsReducer(initialState, action);

    expect(result.currentOffer).toBe(MockDetailedOffer);
    expect(result.isOfferLoading).toBe(false);
  });
  it('should set loading state on fetchDetailedOffer rejected ', () => {
    const action = fetchDetailedOffer.rejected(null, '', '');
    const result = offerDetailsReducer(initialState, action);

    expect(result.isOfferLoading).toBe(false);
  });
  it('should set nearby offers on fetchNearbyOffers fulfilled', () => {
    const action = fetchNearbyOffers.fulfilled(MockData, '', '');
    const result = offerDetailsReducer(initialState, action);

    expect(result.nearbyOffers).toBe(MockData);
  });
  it('should toggle isFavorite on toggleFavorites fulfilled', () => {
    const initialStateToToggle = {
      currentOffer: {
        id: '1',
        isFavorite: false,
      } as DetailedOffer,
      nearbyOffers: [],
      isOfferLoading: true,
    };
    const toggledOffer: Offer = {
      id: '1',
      isFavorite: true,
    } as Offer;
    const action = toggleFavorites.fulfilled(toggledOffer, '', toggledOffer);
    const result = offerDetailsReducer(initialStateToToggle, action);

    expect(result.currentOffer!.isFavorite).toBe(true);
  });
});
