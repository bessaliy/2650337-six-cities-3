import {memo, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import UserNav from './user-nav.tsx';

type HeaderProps = {
  rightSlot: boolean;
}

function HeaderRaw({rightSlot}: HeaderProps):ReactElement {
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);
  return (
    <div className='header__wrapper'>

      <div className='header__left'>
        <Link className='header__logo-link header__logo-link--active' to={AppRoute.MainPage}>
          <img className='header__logo' src='/img/logo.svg' alt='6 cities logo' width='81' height='41'/>
        </Link>
      </div>

      {rightSlot ? <UserNav isAuth={authorizationStatus} /> : ''}

    </div>
  );
}
const Header = memo(HeaderRaw);
export default Header;
