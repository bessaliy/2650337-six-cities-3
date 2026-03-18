import {ReactElement} from 'react';
import {Offer} from '../../../types/offer.ts';
import {CITIES} from '../../../const.ts';

import FavoritesCityGroup from './favorites-city-group.tsx';

type FavoritesListProps = {
  offers: Offer[];
};

function FavoritesList({offers}: FavoritesListProps): ReactElement {
  return (
    <section className='favorites'>
      <h1 className='favorites__title'>Saved listing</h1>

      <ul className='favorites__list'>
        {CITIES.map((city) => {
          const cityOffers = offers.filter(
            (offer) => offer.city.name === city.name
          );

          return (
            <FavoritesCityGroup
              key={city.name}
              offers={cityOffers}
              city={city}
            />
          );
        })}

      </ul>

    </section>
  );
}

export default FavoritesList;
