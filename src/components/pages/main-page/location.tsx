import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {City} from '../../../types/city.ts';

type LocationProps = {
  city: City;
  isActive: boolean;
  onClick: (city: City) => void;
};

function Location({city, isActive, onClick}: LocationProps): ReactElement {
  return (
    <li className='locations__item'>
      <Link
        className={`locations__item-link tabs__item${isActive ? ' tabs__item--active' : ''}`}
        to='#'
        onClick={(evt) => {
          evt.preventDefault();
          onClick(city);
        }}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

export default Location;
