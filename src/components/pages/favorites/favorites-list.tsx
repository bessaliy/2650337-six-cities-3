import {ReactElement} from 'react';
import {Offer} from '../../../types/offer.ts';

import FavoritesCityGroup from './favorites-city-group.tsx';
import {ViewMode} from '../../../const.ts';

type FavoritesListProps = {
  offers: Offer[];
  viewMode: keyof typeof ViewMode;
};

function FavoritesList({offers, viewMode}: FavoritesListProps): ReactElement {
  return (
    <section className='favorites'>
      <h1 className='favorites__title'>Saved listing</h1>

      <ul className='favorites__list'>
        <FavoritesCityGroup offers={offers} viewMode={viewMode} />
      </ul>

    </section>
  );
}

export default FavoritesList;
