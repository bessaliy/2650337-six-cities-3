import {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  isAuth: boolean;
  children: ReactElement;
};

function PrivateRoute({ isAuth, children }: PrivateRouteProps): ReactElement {
  return isAuth ? children : <Navigate to='/login' replace />;
}
export default PrivateRoute;
