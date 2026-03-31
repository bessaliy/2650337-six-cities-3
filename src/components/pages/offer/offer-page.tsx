import {ReactElement, useEffect} from 'react';
import {useParams, Navigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDetailedOffer, fetchNearbyOffers, fetchReviews} from '../../../store/api-actions.ts';
import {getCurrentOffer, getNearbyOffers, getReviews, getIsOfferLoading} from '../../../store/selectors.ts';

import {MapName, CardView, NearbyLimits, AppRoute} from '../../../const.ts';
import Spinner from '../../ui/spinner/spinner.tsx';

import Header from '../../layout/header.tsx';
import UserNav from '../../layout/user-nav.tsx';
import PlaceCard from '../../place-card/place-card.tsx';
import Map from '../../map/map.tsx';
import OfferInfo from './offer-info.tsx';
import ReviewsList from './reviews-list.tsx';
import OfferGallery from './offer-gallery.tsx';
import {AppDispatch, RootState} from '../../../store';


function OfferPage(): ReactElement {
  const {id} = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const currentOffer = useSelector(getCurrentOffer);
  const reviews = useSelector(getReviews);
  const nearbyOffers = useSelector(getNearbyOffers).slice(0, NearbyLimits.Max);
  const isOfferLoading = useSelector(getIsOfferLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailedOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer || !id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <Header rightSlot={<UserNav isAuth={authorizationStatus}/>}/>
        </div>
      </header>

      <main className='page__main page__main--offer'>
        <section className='offer'>

          <div className='offer__gallery-container container'>
            <OfferGallery images={currentOffer.images}/>
          </div>

          <div className='offer__container container'>
            <div className='offer__wrapper'>

              <OfferInfo data={currentOffer}/>

              <ReviewsList
                reviews={reviews}
                offerId={id}
                isAuth={authorizationStatus}
              />

            </div>
          </div>

          <Map
            offers={[currentOffer, ...nearbyOffers]}
            selectedOfferId={currentOffer.id}
            mapName={MapName.Offers}
            city={currentOffer.city}
          />

        </section>

        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>

            <div className='near-places__list places__list'>
              {nearbyOffers.map((place) => (
                <PlaceCard
                  key={place.id}
                  data={place}
                  viewMode={CardView.Offers}
                />
              ))}
            </div>

          </section>
        </div>

      </main>
    </div>
  );
}

export default OfferPage;

