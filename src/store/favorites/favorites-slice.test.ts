import favoritesReducer from './favorites-slice.ts';
import {fetchFavorites, toggleFavorites} from '../api-actions.ts';
import {ChangedOffer, ChangedOfferFalse, MockData} from '../../mock/mock-data.ts';

describe('favoritesSlice reducer', () => {
  const initialState = {
    favorites: [],
    isLoading: false,
  };
  it('should return initial state with empty action', () => {
    const result = favoritesReducer(undefined, {type: ''});

    expect(result).toEqual(initialState);
  });
  it('should set isLoading on fetchFavorites pending', () => {
    const action = fetchFavorites.pending('', undefined);
    const result = favoritesReducer(initialState, action);

    expect(result.isLoading).toBe(true);
  });
  it('should execute correctly when fetchFavorites is fulfilled', () => {
    const action = fetchFavorites.fulfilled(MockData, '', undefined);
    const result = favoritesReducer(initialState, action);

    expect(result.favorites).toEqual(MockData);
    expect(result.isLoading).toBe(false);
  });
  it('should set isLoading on fetchFavorites rejected', () => {
    const action = fetchFavorites.rejected(null, '', undefined);
    const result = favoritesReducer(initialState, action);

    expect(result.isLoading).toBe(false);
  });
  it('should add offer on toggleFavorites fulfilled', () => {
    const action = toggleFavorites.fulfilled(ChangedOffer, '', {id: ChangedOffer.id, isFavorite: ChangedOffer.isFavorite});
    const result = favoritesReducer(initialState, action);

    expect(result.favorites).toContainEqual(ChangedOffer);
  });
  it('should remove offer on toggleFavorites fulfilled', () => {
    const initialStateToToggle = {
      favorites: [ChangedOffer],
      isLoading: false,
    };
    const action = toggleFavorites.fulfilled(ChangedOfferFalse, '', {id: ChangedOfferFalse.id, isFavorite: ChangedOfferFalse.isFavorite});
    const result = favoritesReducer(initialStateToToggle, action);

    expect(result.favorites).not.toContainEqual(ChangedOfferFalse);
  });
});
