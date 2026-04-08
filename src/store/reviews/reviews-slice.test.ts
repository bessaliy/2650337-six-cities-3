import reviewsReducer from './reviews-slice.ts';
import {fetchReviews, postReview} from '../api-actions.ts';
import {MockReviews, MockReviewToPush} from '../../mock/mock-reviews.ts';

describe('reviewsSlice reducer', () => {
  const initialState = {
    reviews: [],
    isReviewSubmitting: false,
    isReviewSubmitSuccess: false,
    reviewError: null,
  };
  it('should return initial state with empty action', () => {
    const result = reviewsReducer(undefined, {type: ''});

    expect(result).toEqual(initialState);
  });
  it('should set reviews on fetchReviews fulfilled', () => {
    const action = fetchReviews.fulfilled(MockReviews, '', '');
    const result = reviewsReducer(initialState, action);

    expect(result.reviews).toEqual(MockReviews);
  });
  it('should set submitting state on postReview pending', () => {
    const action = postReview.pending('', {
      id: '1',
      comment: 'test',
      rating: 5,
    });
    const result = reviewsReducer(initialState, action);

    expect(result.isReviewSubmitting).toBe(true);
    expect(result.isReviewSubmitSuccess).toBe(false);
    expect(result.reviewError).toBe(null);
  });
  it('should push right review on postReview fulfilled', () => {
    const action = postReview.fulfilled(MockReviewToPush, '', {
      id: '1',
      comment: 'test',
      rating: 5,
    });
    const result = reviewsReducer(initialState, action);

    expect(result.reviews).toContainEqual(MockReviewToPush);
    expect(result.isReviewSubmitting).toBe(false);
    expect(result.isReviewSubmitSuccess).toBe(true);
  });
  it('should set error on postReview rejected', () => {
    const action = postReview.rejected(null, '', {
      id: '1',
      comment: 'test',
      rating: 5,
    });
    const result = reviewsReducer(initialState, action);
    expect(result.isReviewSubmitting).toBe(false);
    expect(result.isReviewSubmitSuccess).toBe(false);
    expect(result.reviewError).toBe('Не удалось отправить отзыв');
  });
});
