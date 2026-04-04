import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

import Header from '../../layout/header.tsx';
import FavoritesList from './favorites-list.tsx';
import {useSelector} from 'react-redux';
import {getFavorites} from '../../../store/selectors.ts';

function FavoritesPage(): ReactElement {

  const favorites = useSelector(getFavorites);
  const favoritesFlat = favorites.flatMap((item) => item.offers);

  return (
    <div className='page'>

      <header className='header'>
        <div className='container'>
          <Header rightSlot />
        </div>
      </header>

      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <FavoritesList offers={favoritesFlat}/>
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
