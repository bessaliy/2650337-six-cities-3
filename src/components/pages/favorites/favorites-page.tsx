import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../../types/offer.ts';
import {AppRoute, ViewModeNames} from '../../../const.ts';

import Header from '../../layout/header.tsx';
import UserNav from '../../layout/user-nav.tsx';
import FavoritesList from './favorites-list.tsx';

type FavoritesPageProps = {
  offers: Offer[];
}

function FavoritesPage({offers}: FavoritesPageProps): ReactElement {
  // const favorites = offers.filter((offer) => offer.isFavorite);
  const favorites = offers.slice(0, 3);

  return (
    <div className='page'>

      <header className='header'>
        <div className='container'>
          <Header rightSlot={<UserNav/>}/>
        </div>
      </header>

      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <FavoritesList offers={favorites} viewMode={ViewModeNames.Favorites}/>
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
