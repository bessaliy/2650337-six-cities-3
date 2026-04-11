import {ReactElement, useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {MapName, SortingType} from '../../../const.ts';
import {RootState} from '../../../store';
import {getSortedOffers} from '../../../utils.ts';
import {fetchOffers} from '../../../store/api-actions.ts';
import {AppDispatch} from '../../../store';
import {getFilteredOffers} from '../../../store/selectors.ts';

import PlaceCardList from '../../place-card/place-card-list.tsx';
import Map from '../../map/map.tsx';
import Header from '../../layout/header.tsx';
import Locations from './locations.tsx';
import PlacesSorting from './places-sorting.tsx';
import Spinner from '../../ui/spinner/spinner.tsx';
import NoOffersFound from './no-offers-found.tsx';

function MainPage(): ReactElement {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sortingType, setSortingType] = useState<SortingType>(SortingType.Popular);
  const city = useSelector((state: RootState) => state.offers.city);

  const filteredOffers = useSelector(getFilteredOffers);

  const sortedOffers = useMemo(
    () => getSortedOffers(filteredOffers, sortingType),
    [filteredOffers, sortingType]
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const isLoading = useSelector((state: RootState) => state.offers.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='page page--gray page--main'>

      <header className='header'>
        <div className='container'>
          <Header rightSlot />
        </div>
      </header>

      <main className={filteredOffers.length === 0 ? ('page__main page__main--index page__main--index-empty') : ('page__main page__main--index')}>
        <h1 className='visually-hidden'>Cities</h1>

        <div className='tabs'>
          <Locations />
        </div>

        <div className='cities'>
          {filteredOffers.length === 0 ? (
            <NoOffersFound city={city}/>
          ) : (
            <div className='cities__places-container container'>
              <section className='cities__places places'>
                <h2 className='visually-hidden'>Places</h2>
                <b className='places__found'>{filteredOffers.length} {filteredOffers.length === 1 ? 'place' : 'places'} to stay in {city.name}</b>

                <PlacesSorting
                  currentSorting={sortingType}
                  onSortingChange={setSortingType}
                />
                <PlaceCardList
                  offers={sortedOffers}
                  onHoverToggle={setActiveOfferId}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={sortedOffers}
                  selectedOfferId={activeOfferId}
                  mapName={MapName.Cities}
                  city={city}
                />
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default MainPage;

