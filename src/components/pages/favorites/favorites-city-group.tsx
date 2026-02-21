import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../../types/offer.ts';
import {ViewMode} from '../../../const.ts';

import PlaceCard from '../../place-card/place-card.tsx';

type FavoritesCityGroupProps = {
  offers: Offer[];
  viewMode: keyof typeof ViewMode;
}

function FavoritesCityGroup({ offers, viewMode }: FavoritesCityGroupProps): ReactElement {

  if (!offers) {
    return <p>Nothing yet saved</p>;
  }

  return (
    <li className='favorites__locations-items'>

      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <Link className='locations__item-link' to='#'>
            <span>Amsterdam</span>
          </Link>
        </div>
      </div>

      <div className='favorites__places'>
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            data={offer}
            viewMode={viewMode}
          />
        ))}
      </div>

    </li>
  );
}

export default FavoritesCityGroup;
