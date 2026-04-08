import {ReactElement} from 'react';
import {DetailedOffer} from '../../../types/offer.ts';
import {getCapitalized, getRatingWidth} from '../../../utils.ts';
import {AppRoute, AuthStatus} from '../../../const.ts';
import {toggleFavorites} from '../../../store/api-actions.ts';
import {useDispatch, useSelector} from 'react-redux';
import {getAuth} from '../../../store/selectors.ts';
import {useNavigate} from 'react-router-dom';
import {AppDispatch} from '../../../store';

type OfferInfoProps = {
  data: DetailedOffer;
}
function OfferInfo({data}: OfferInfoProps): ReactElement {
  const host = data.host;
  const {id, isFavorite} = data;
  const isAuth = useSelector(getAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleFavoriteClick = () => {
    if (isAuth !== AuthStatus.Auth) {
      navigate(AppRoute.LoginPage);
    } else {
      dispatch(toggleFavorites({id, isFavorite}));
    }
  };
  return (
    <>
      {data.isPremium ?
        <div className="offer__mark">
          <span>Premium</span>
        </div> : null}


      <div className="offer__name-wrapper">

        <h1 className='offer__name'>
          {data.title}
        </h1>

        <button className={`offer__bookmark-button button  ${
          data.isFavorite ? 'offer__bookmark-button--active' : ''
        }`}
        type='button'
        onClick={handleFavoriteClick}
        >
          <svg className='offer__bookmark-icon' width='31' height='33'>
            <use xlinkHref='#icon-bookmark'></use>
          </svg>
          <span className='visually-hidden'>To bookmarks</span>
        </button>

      </div>

      <div className='offer__rating rating'>

        <div className='offer__stars rating__stars'>
          <span style={{width: getRatingWidth(data)}}></span>
          <span className='visually-hidden'>Rating</span>
        </div>

        <span className='offer__rating-value rating__value'>{data.rating}</span>

      </div>

      <ul className='offer__features'>
        <li className='offer__feature offer__feature--entire'>{getCapitalized(data.type)}</li>
        <li className='offer__feature offer__feature--bedrooms'>{data.bedrooms === 1 ? `${data.bedrooms} Bedroom` : `${data.bedrooms} Bedrooms`}</li>
        <li className='offer__feature offer__feature--adults'>Max {data.maxAdults === 1 ? `${data.maxAdults} adult` : `${data.maxAdults} adults`}</li>
      </ul>

      <div className='offer__price'>
        <b className='offer__price-value'>&euro;{data.price}</b>
        <span className='offer__price-text'>&nbsp;night</span>
      </div>

      <div className='offer__inside'>
        <h2 className='offer__inside-title'>What&apos;s inside</h2>

        <ul className='offer__inside-list'>
          {data.goods.map((good) => (
            <li key={good} className="offer__inside-item">{good}</li>
          ))}
        </ul>

      </div>

      <div className='offer__host'>
        <h2 className='offer__host-title'>Meet the host</h2>

        <div className='offer__host-user user'>

          <div
            className={`offer__avatar-wrapper ${
              host.isPro ? 'offer__avatar-wrapper--pro' : ''
            } user__avatar-wrapper`}
          >
            <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar"/>
          </div>

          <span className="offer__user-name">{host.name}</span>
          {host.isPro ? <span className="offer__user-status">Pro</span> : null}

        </div>

        <div className='offer__description'>
          <p className='offer__text'>
            {data.description}
          </p>

        </div>

      </div>
    </>
  );
}

export default OfferInfo;
