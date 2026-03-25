import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';
import { CITIES, AuthStatus } from '../const';
import {DetailedOffer, Offer} from '../types/offer';
import {fetchDetailedOffer, fetchNearbyOffers, fetchOffers, fetchReviews, postReview} from './api-actions.ts';
import {Review} from '../types/review.ts';

export type State = {
  city: typeof CITIES[number];
  offers: Offer[];
  currentOffer: DetailedOffer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isLoading: boolean;
  isOfferLoading: boolean;
  isReviewSubmitting: boolean;
  isReviewSubmitSuccess: boolean;
  reviewError: string | null;
  authorizationStatus: AuthStatus;
  userEmail: string | null;
  loginError: string | null;
};

const initialState: State = {
  city: CITIES[0],
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  reviews: [],
  isLoading: false,
  isOfferLoading: true,
  isReviewSubmitting: false,
  isReviewSubmitSuccess: false,
  reviewError: null,
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
      })
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
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReview.pending, (state) => {
        state.isReviewSubmitting = true;
        state.isReviewSubmitSuccess = false;
        state.reviewError = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isReviewSubmitting = false;
        state.isReviewSubmitSuccess = true;
      })
      .addCase(postReview.rejected, (state) => {
        state.isReviewSubmitting = false;
        state.isReviewSubmitSuccess = false;
        state.reviewError = 'Не удалось отправить отзыв';
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
