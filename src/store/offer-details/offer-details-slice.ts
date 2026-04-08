import {createSlice} from '@reduxjs/toolkit';
import {DetailedOffer, Offer} from '../../types/offer.ts';
import {fetchDetailedOffer, fetchNearbyOffers, toggleFavorites} from '../api-actions.ts';

type OffersDetailsState = {
  currentOffer: DetailedOffer | null;
  nearbyOffers: Offer[];
  isOfferLoading: boolean;
};

const initialState: OffersDetailsState = {
  currentOffer: null,
  nearbyOffers: [],
  isOfferLoading: true,
};

const offerDetailsSlice = createSlice({
  name: 'offerDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailedOffer.pending, (state) => {
        state.isOfferLoading = true;
        state.currentOffer = null;
      })
      .addCase(fetchDetailedOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchDetailedOffer.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        const toggledOffer = action.payload;
        if (state.currentOffer?.id === toggledOffer.id) {
          state.currentOffer.isFavorite = toggledOffer.isFavorite;
        }
      });
  },
});

export default offerDetailsSlice.reducer;
