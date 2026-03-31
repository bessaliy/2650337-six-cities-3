import {createSlice} from '@reduxjs/toolkit';
import {fetchReviews, postReview} from '../api-actions.ts';
import {Review} from '../../types/review.ts';

type ReviewsState = {
  reviews: Review[];
  isReviewSubmitting: boolean;
  isReviewSubmitSuccess: boolean;
  reviewError: string | null;
};

const initialState: ReviewsState = {
  reviews: [],
  isReviewSubmitting: false,
  isReviewSubmitSuccess: false,
  reviewError: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default reviewsSlice.reducer;
