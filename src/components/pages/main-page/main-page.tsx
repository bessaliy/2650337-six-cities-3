import {ReactElement, useState} from 'react';
import {Offer} from '../../../types/offer.ts';
import {MapName, ViewModeNames} from '../../../const.ts';

import PlaceCardList from '../../place-card/place-card-list.tsx';
import Map from '../../map/map.tsx';
import Header from '../../layout/header.tsx';
import UserNav from '../../layout/user-nav.tsx';
import Locations from './locations.tsx';
import PlacesSorting from './places-sorting.tsx';

type MainPageProps = {
  cardsAmount: number;
  offers: Offer[];
}

function MainPage({offers, cardsAmount}: MainPageProps): ReactElement {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const handleCardLeave = () => setActiveOfferId(null);

  return (
    <div className='page page--gray page--main'>

      <header className='header'>
        <div className='container'>
          <Header rightSlot={<UserNav />} />
        </div>
      </header>

      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>

        <div className='tabs'>
          <Locations />
        </div>

        <div className='cities'>
          <div className='cities__places-container container'>

            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>312 places to stay in Amsterdam</b>

              <PlacesSorting />

              <PlaceCardList
                cardsAmount={cardsAmount}
                offers={offers}
                onCardHover={setActiveOfferId}
                onCardLeave={handleCardLeave}
                viewMode={ViewModeNames.Cities}
              />

            </section>

            <div className='cities__right-section'>
              <Map activeOfferId={activeOfferId} mapName={MapName.Cities}/>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default MainPage;

