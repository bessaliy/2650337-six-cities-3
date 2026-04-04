import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CITIES} from '../../const.ts';
import {Offer} from '../../types/offer.ts';
import {fetchOffers} from '../api-actions.ts';

type OffersState = {
  city: typeof CITIES[number];
  offers: Offer[];
  isLoading: boolean;
};

const initialState: OffersState = {
  city: CITIES[0],
  offers: [],
  isLoading: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<typeof CITIES[number]>) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {setActiveCity} = offersSlice.actions;
export default offersSlice.reducer;
