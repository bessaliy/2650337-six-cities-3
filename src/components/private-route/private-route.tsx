import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const.ts';
import {useSelector} from 'react-redux';
import Spinner from '../ui/spinner/spinner.tsx';
import {getAuth} from '../../store/selectors.ts';

type PrivateRouteProps = {
  children: ReactElement;
};

function PrivateRoute({ children }: PrivateRouteProps): ReactElement {
  const authorizationStatus = useSelector(getAuth);

  if (authorizationStatus === AuthStatus.Unknown) {
    return <Spinner />;
  }

  if (authorizationStatus === AuthStatus.NoAuth) {
    return <Navigate to={AppRoute.LoginPage} replace />;
  }

  return children;
}
export default PrivateRoute;
