import {createSlice} from '@reduxjs/toolkit';
import {Offer} from '../../types/offer.ts';
import {fetchFavorites, toggleFavorites} from '../api-actions.ts';

type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        const toggledOffer = action.payload;

        if (toggledOffer.isFavorite) {
          state.favorites.push(toggledOffer);
        } else {
          state.favorites = state.favorites.filter(
            (offer) => offer.id !== toggledOffer.id
          );
        }
      });
  },
});

export default favoritesSlice.reducer;
