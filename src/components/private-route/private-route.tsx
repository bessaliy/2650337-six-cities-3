import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

type PrivateRouteProps = {
  children: ReactElement;
};

function PrivateRoute({ children }: PrivateRouteProps): ReactElement {
  const authorizationStatus = useSelector((state: RootState) => state.offers.authorizationStatus);

  if (authorizationStatus === AuthStatus.Unknown) {
    return <div>Loading...</div>;
  }

  if (authorizationStatus === AuthStatus.NoAuth) {
    return <Navigate to={AppRoute.LoginPage} replace />;
  }

  return children;
}
export default PrivateRoute;
