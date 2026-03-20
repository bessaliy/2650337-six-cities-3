import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {AuthStatus, AppRoute} from '../../const.ts';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../store';
import {logout} from '../../store/api-actions.ts';

type UserNavProps = {
  isAuth: AuthStatus;
}

function UserNav({isAuth}: UserNavProps):ReactElement {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  const email = useSelector(
    (state: RootState) => state.offers.userEmail
  );

  if (isAuth === AuthStatus.Auth) {
    return (
      <nav className='header__nav'>
        <ul className='header__nav-list'>

          <li className='header__nav-item user'>
            <Link className='header__nav-link header__nav-link--profile' to='#'>
              <div className='header__avatar-wrapper user__avatar-wrapper'></div>
              <span className='header__user-name user__name'>{email}</span>
              <span className='header__favorite-count'>3</span>
            </Link>
          </li>

          <li className='header__nav-item'>
            <a className='header__nav-link' onClick={handleLogout}>
              <span className='header__signout'>Sign out</span>
            </a>
          </li>

        </ul>
      </nav>
    );
  }

  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <Link className='header__nav-link header__nav-link--profile' to={AppRoute.LoginPage}>
            <div className='header__avatar-wrapper user__avatar-wrapper'>
            </div>
            <span className='header__login'>Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
