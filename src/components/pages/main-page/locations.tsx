import {ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Location from './location.tsx';
import {CITIES} from '../../../const.ts';
import {RootState} from '../../../store';
import {setActiveCity} from '../../../store/reducer.ts';

function Locations(): ReactElement {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: RootState) => state.offers.city);
  return (
    <section className='locations container'>

      <ul className='locations__list tabs__list'>

        {CITIES.map((city) => (
          <Location
            key={city.name}
            city={city}
            isActive={city.name === activeCity.name}
            onClick={() => dispatch(setActiveCity(city))}
          />
        ))}
      </ul>

    </section>
  );
}

export default Locations;
