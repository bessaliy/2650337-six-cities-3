import { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../pages/login/login-page.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import PageNotFound from '../pages/not-found/page-not-found.tsx';

import PrivateRoute from '../private-route/private-route.tsx';

type AppProps = {
  cardsAmount: number;
}

function App({cardsAmount}: AppProps): ReactElement {
  const isAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage cardsAmount={cardsAmount}/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/favorites'
          element={
            <PrivateRoute isAuth={isAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path='/offer/:id' element={<OfferPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
