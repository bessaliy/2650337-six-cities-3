import {ReactElement} from 'react';
import ReviewForm from './review-form.tsx';
import ReviewItem from './review-item.tsx';

import {Review} from '../../../types/review.ts';
import {AuthStatus} from '../../../const.ts';

type ReviewsListProps = {
  reviews: Review[];
  isAuth: AuthStatus;
  offerId: string;
}

function ReviewsList({reviews, isAuth, offerId}: ReviewsListProps): ReactElement {
  return (
    <section className='offer__reviews reviews'>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{reviews.length}</span></h2>

      <ul className='reviews__list'>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            data={review}
          />
        ))}
      </ul>

      {isAuth === AuthStatus.Auth ? <ReviewForm offerId={offerId}/> : null}
    </section>
  );
}

export default ReviewsList;
