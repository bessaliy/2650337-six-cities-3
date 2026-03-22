import {ReactElement, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {checkAuth} from '../../store/api-actions.ts';

import MainPage from '../pages/main-page/main-page.tsx';
import LoginPage from '../pages/login/login-page.tsx';
import FavoritesPage from '../pages/favorites/favorites-page.tsx';
import OfferPage from '../pages/offer/offer-page.tsx';
import PageNotFound from '../pages/not-found/page-not-found.tsx';

import PrivateRoute from '../private-route/private-route.tsx';

import {AppRoute} from '../../const.ts';


function App(): ReactElement {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.MainPage}
          element={ <MainPage /> }
        />

        <Route
          path={AppRoute.LoginPage}
          element={<LoginPage />}
        />

        <Route
          path={AppRoute.FavoritesPage}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.OfferPage}
          element={<OfferPage />}
        />

        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
