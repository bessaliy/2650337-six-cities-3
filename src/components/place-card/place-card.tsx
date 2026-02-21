import { ReactElement } from 'react';
import { Offer } from '../../types/offer.ts';
import { getRatingWidth } from '../../utils.ts';
import {Link} from 'react-router-dom';
import {ViewMode} from '../../const.ts';

type PlaceCardProps = {
  data: Offer;
  onHover?: (id: string) => void;
  onLeave?: () => void;
  viewMode: keyof typeof ViewMode;
}

function PlaceCard(props: PlaceCardProps): ReactElement {
  const { name, width, height } = ViewMode[props.viewMode];

  return (
    <article
      className={`${name}__card place-card`}
      onMouseEnter={() => props.onHover?.(props.data.id)}
      onMouseLeave={() => props.onLeave?.()}
    >

      <div className='place-card__mark'>
        <span>Premium</span>
      </div>

      <div className={`${name}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${props.data.id}`}>
          <img className='place-card__image' src={props.data.previewImage} width={width} height={height} alt='Place image'/>
        </Link>
      </div>

      <div className='place-card__info'>

        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{props.data.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className='place-card__bookmark-button button' type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>

        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: getRatingWidth(props.data)}}></span>
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>

        <h2 className='place-card__name'>
          <Link to={`/offer/${props.data.id}`}>{props.data.title}</Link>
        </h2>
        <p className='place-card__type'>Apartment</p>

      </div>

    </article>
  );
}

export default PlaceCard;
