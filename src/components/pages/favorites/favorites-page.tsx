import {ReactElement, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

import Header from '../../layout/header.tsx';
import FavoritesList from './favorites-list.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {getFavoritesOffers} from '../../../store/selectors.ts';
import FavoritesEmpty from './favorites-empty.tsx';
import {AppDispatch, RootState} from '../../../store';
import {fetchFavorites} from '../../../store/api-actions.ts';
import Spinner from '../../ui/spinner/spinner.tsx';

function FavoritesPage(): ReactElement {
  const favorites = useSelector(getFavoritesOffers);
  const isEmpty = favorites.length === 0;

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const isLoading = useSelector((state: RootState) => state.favorites.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={isEmpty ? ('page page--favorites-empty') : ('page')}>

      <header className='header'>
        <div className='container'>
          <Header rightSlot />
        </div>
      </header>

      <main className={isEmpty ? ('page__main page__main--favorites page__main--favorites-empty') : ('page__main page__main--favorites')}>
        <div className='page__favorites-container container'>
          {isEmpty ? <FavoritesEmpty /> : <FavoritesList favorites={favorites}/> }
        </div>
      </main>

      <footer className='footer container'>
        <Link className='footer__logo-link' to={AppRoute.MainPage}>
          <img className='footer__logo' src='/img/logo.svg' alt='6 cities logo' width='64' height='33'/>
        </Link>
      </footer>

    </div>
  );
}

export default FavoritesPage;
