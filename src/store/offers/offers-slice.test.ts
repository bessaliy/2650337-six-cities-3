import offersReducer, {setActiveCity} from './offers-slice.ts';
import {CITIES} from '../../const.ts';
import {fetchOffers, toggleFavorites} from '../api-actions.ts';
import {ChangedOffer, MockData, MockDataExpected, MockDataInitial} from '../../mock/mock-data.ts';

describe('offersSlice reducer', () => {
  const initialState = {
    city: CITIES[0],
    offers: [],
    isLoading: false,
  };
  it('should return initial state with empty action', () => {
    const result = offersReducer(undefined, {type: ''});

    expect(result).toEqual(initialState);
  });
  it('should set city', () => {
    const result = offersReducer(initialState, setActiveCity(CITIES[1]));

    expect(result.city).toBe(CITIES[1]);
  });
  it('should set user status on fetchOffers pending', () => {
    const action = fetchOffers.pending('', undefined);
    const result = offersReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });
  it('should set offers on fetchOffers fulfilled', () => {
    const action = fetchOffers.fulfilled(MockData, '');
    const result = offersReducer(initialState, action);

    expect(result.offers).toEqual(MockData);
    expect(result.isLoading).toBe(false);
  });
  it('should set loading state on fetchOffers rejected', () => {
    const action = fetchOffers.rejected(null, '');
    const result = offersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
  });
  it('should set toggled favorite offer', () => {
    const initialStateToToggle = {
      city: CITIES[0],
      offers: MockDataInitial,
      isLoading: false,
    };
    const action = toggleFavorites.fulfilled(ChangedOffer, '', {id: ChangedOffer.id, isFavorite: true});
    const result = offersReducer(initialStateToToggle, action);

    expect(result.offers).toEqual(MockDataExpected);
  });
});
