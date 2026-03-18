import {ReactElement} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {MapName, CardView, AuthStatus, NearbyLimits} from '../../../const.ts';
import {MockReviews} from '../../../mock/mock-reviews.ts';

import Header from '../../layout/header.tsx';
import UserNav from '../../layout/user-nav.tsx';
import PlaceCard from '../../place-card/place-card.tsx';
import Map from '../../map/map.tsx';
import OfferInfo from './offer-info.tsx';
import ReviewsList from './reviews-list.tsx';
import OfferGallery from './offer-gallery.tsx';
import {RootState} from '../../../store';

type OfferPageProps = {
  isAuth: AuthStatus;
}

function OfferPage({isAuth}: OfferPageProps): ReactElement {
  const {id} = useParams<{ id: string }>();
  const offers = useSelector((state: RootState) => state.offers.offers);

  const offer = offers.find((o) => o.id === id);

  const nearbyPlaces = offer
    ? offers.filter((place) => place.id !== offer.id).slice(0, NearbyLimits.Max)
    : [];

  const mapOffers = offer ? [offer, ...nearbyPlaces] : [];

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <Header rightSlot={<UserNav isAuth={isAuth}/>}/>
        </div>
      </header>

      <main className='page__main page__main--offer'>
        <section className='offer'>

          <div className='offer__gallery-container container'>
            <OfferGallery />
          </div>

          <div className='offer__container container'>
            <div className='offer__wrapper'>

              <OfferInfo/>

              <ReviewsList reviews={MockReviews} />

            </div>
          </div>

          <Map
            offers={mapOffers}
            selectedOfferId={offer.id}
            mapName={MapName.Offers}
            city={offer.city}
          />

        </section>

        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>

            <div className='near-places__list places__list'>
              {nearbyPlaces.map((place) => (
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

