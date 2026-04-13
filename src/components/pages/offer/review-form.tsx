import React, { memo, ReactElement, useEffect, useState} from 'react';
import {ReviewLimits} from '../../../const.ts';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store';
import {postReview} from '../../../store/api-actions.ts';
// import {RatingStars} from '../../../const.ts';

type ReviewFormProps = {
  offerId: string;
};

function ReviewFormRaw({offerId}: ReviewFormProps): ReactElement {

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const isSubmitDisabled = rating === null || reviewText.length < +ReviewLimits.Min || reviewText.length > +ReviewLimits.Max;
  const dispatch = useDispatch<AppDispatch>();

  // const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmitting = useSelector((state: RootState) => state.reviews.isReviewSubmitting);
  const error = useSelector((state: RootState) => state.reviews.reviewError);
  const isReviewSubmitSuccess = useSelector((state: RootState) => state.reviews.isReviewSubmitSuccess);

  useEffect(() => {
    if (isReviewSubmitSuccess) {
      setReviewText('');
      setRating(null);
      // setIsSubmitting(false);

      // setTimeout(() => {
      //   setIsSubmitting(false);
      // }, 150);
    }
  }, [isReviewSubmitSuccess]);
  //
  // useEffect(() => {
  //   if (error) {
  //     setIsSubmitting(false);
  //   }
  // }, [error]);
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (rating === null) {
      return;
    }
    //
    // setIsSubmitting(true);

    dispatch(postReview({ id: offerId, comment: reviewText, rating }));
  };

  return (
    <form
      className='reviews__form form'
      action='#'
      method='post'
      onSubmit={handleSubmit}
    >

      <label className='reviews__label form__label' htmlFor='review'>Your review</label>

      <div className='reviews__rating-form form__rating'>а
        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='5'
          id='5-stars'
          type='radio'
          onChange={() => setRating(5)}
          checked={rating === 5}
          disabled={isSubmitting}
          readOnly
        />
        <label htmlFor='5-stars' className='reviews__rating-label form__rating-label' title='perfect'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='4'
          id='4-stars'
          type='radio'
          onChange={() => setRating(4)}
          checked={rating === 4}
          disabled={isSubmitting}
          readOnly
        />
        <label htmlFor='4-stars' className='reviews__rating-label form__rating-label' title='good'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='3'
          id='3-stars'
          type='radio'
          onChange={() => setRating(3)}
          checked={rating === 3}
          disabled={isSubmitting}
          readOnly
        />
        <label htmlFor='3-stars' className='reviews__rating-label form__rating-label' title='not bad'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='2'
          id='2-stars'
          type='radio'
          onChange={() => setRating(2)}
          checked={rating === 2}
          disabled={isSubmitting}
          readOnly
        />
        <label htmlFor='2-stars' className='reviews__rating-label form__rating-label' title='badly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='1'
          id='1-stars'
          type='radio'
          onChange={() => setRating(1)}
          checked={rating === 1}
          disabled={isSubmitting}
          readOnly
        />
        <label htmlFor='1-stars' className='reviews__rating-label form__rating-label' title='terribly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

      </div>

      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        disabled={isSubmitting}
      />

      <div className='reviews__button-wrapper'>

        <p className='reviews__help'>
          To submit review please make sure to set <span className='reviews__star'>rating</span> and describe your stay
          with at least <b className='reviews__text-amount'>{ReviewLimits.Min} characters</b>.
        </p>
        {error && <p style={{color: 'red'}}>{error}</p>}

        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={isSubmitDisabled || isSubmitting}
        >
          Submit
        </button>

      </div>
    </form>
  );
}

const ReviewForm = memo(ReviewFormRaw);
export default ReviewForm;
