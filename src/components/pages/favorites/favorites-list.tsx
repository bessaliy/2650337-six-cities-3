import {ReactElement} from 'react';
import {FavoritesGroup} from '../../../types/favorites-group.ts';

import FavoritesCityGroup from './favorites-city-group.tsx';

type FavoritesListProps = {
  favorites: FavoritesGroup[];
};

function FavoritesList({favorites}: FavoritesListProps): ReactElement {
  return (
    <section className='favorites'>
      <h1 className='favorites__title'>Saved listing</h1>

      <ul className='favorites__list'>
        {favorites.map(({city, offers}) => (
          <FavoritesCityGroup
            key={city}
            offers={offers}
            city={city}
          />)
        )}

      </ul>

    </section>
  );
}

export default FavoritesList;
