import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../../types/offer.ts';
import {CardView} from '../../../const.ts';

import PlaceCard from '../../place-card/place-card.tsx';
import {City} from '../../../types/city.ts';

type FavoritesCityGroupProps = {
  offers: Offer[];
  city: City;
}

function FavoritesCityGroup({ offers, city }: FavoritesCityGroupProps): ReactElement {

  return (
    <li className='favorites__locations-items'>

      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <Link className='locations__item-link' to='#'>
            <span>{city.name}</span>
          </Link>
        </div>
      </div>

      <div className='favorites__places'>
        {offers.length === 0 ? <p>Nothing yet saved</p> : offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            data={offer}
            viewMode={CardView.Favorites}
          />
        ))}
      </div>

    </li>
  );
}

export default FavoritesCityGroup;
