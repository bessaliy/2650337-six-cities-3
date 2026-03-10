import {ReactElement} from 'react';
import {Review} from '../../../types/review.ts';
import {getReviewRatingWidth, getReviewDate} from '../../../utils.ts';

type ReviewItemProp = {
  data: Review;
}

function ReviewItem({data}: ReviewItemProp): ReactElement {
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img className='reviews__avatar user__avatar' src={data.user.avatarUrl} width='54' height='54' alt='Reviews avatar'/>
        </div>
        <span className='reviews__user-name'>{data.user.name}</span>
      </div>

      <div className='reviews__info'>
        <div className='reviews__rating rating'>

          <div className='reviews__stars rating__stars'>
            <span style={{width: getReviewRatingWidth(data)}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>

        </div>

        <p className='reviews__text'>
          {data.comment}
        </p>
        <time className='reviews__time' dateTime={data.date}>{getReviewDate(data.date)}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
