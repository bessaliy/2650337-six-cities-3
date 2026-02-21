import {ReactElement, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Offer} from '../../../types/offer.ts';
import {MapName, ViewModeNames} from '../../../const.ts';

import Header from '../../layout/header.tsx';
import UserNav from '../../layout/user-nav.tsx';
import PlaceCard from '../../place-card/place-card.tsx';
import Map from '../../map/map.tsx';
import OfferInfo from './offer-info.tsx';
import OfferReviews from './offer-reviews.tsx';
import OfferGallery from './offer-gallery.tsx';

type OfferPageProps = {
  offers: Offer[];
}

function OfferPage({offers}: OfferPageProps): ReactElement {
  const {id} = useParams<{ id: string }>();
  const offer = offers.find((o) => o.id === id);
  const nearbyPlaces = offers.slice(0, 3);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <Header rightSlot={<UserNav/>}/>
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

              <OfferReviews />

            </div>
          </div>

          <Map activeOfferId={activeOfferId} mapName={MapName.Offers}/>

        </section>

        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>

            <div className='near-places__list places__list'>
              {nearbyPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  data={place}
                  onHover={setActiveOfferId}
                  onLeave={() => setActiveOfferId(null)}
                  viewMode={ViewModeNames.Offers}
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

