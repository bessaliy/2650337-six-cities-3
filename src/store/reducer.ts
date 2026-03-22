import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import { CITIES, AuthStatus } from '../const';
import { Offer } from '../types/offer';
import {fetchOffers} from './api-actions.ts';

export type State = {
  city: typeof CITIES[number];
  offers: Offer[];
  isLoading: boolean;
  authorizationStatus: AuthStatus;
  userEmail: string | null;
  loginError: string | null;
};

const initialState: State = {
  city: CITIES[0],
  offers: [],
  isLoading: false,
  authorizationStatus: AuthStatus.Unknown,
  userEmail: null,
  loginError: null,
};

const offerSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<typeof CITIES[number]>) {
      state.city = action.payload;
    },
    setAuthorizationStatus(state, action: PayloadAction<AuthStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string | null>) {
      state.userEmail = action.payload;
    },
    setLoginError(state, action: PayloadAction<string | null>) {
      state.loginError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
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

export const {
  setActiveCity,
  setAuthorizationStatus,
  setUserEmail,
  setLoginError
} = offerSlice.actions;
export default offerSlice.reducer;
