import { ReactElement } from 'react';
import {Link, Navigate} from 'react-router-dom';
import Header from '../../layout/header.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store';
import {login} from '../../../store/api-actions.ts';
import {AppRoute, AuthStatus} from '../../../const.ts';
import {setLoginError} from '../../../store/reducer.ts';

function LoginPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.offers.loginError);
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      dispatch(setLoginError('Пароль должен содержать буквы и цифры'));
      return;
    }

    dispatch(setLoginError(null));
    dispatch(login({email, password}));
  };

  const authorizationStatus = useSelector(
    (state: RootState) => state.offers.authorizationStatus
  );

  if (authorizationStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.MainPage} />;
  }

  return (
    <div className='page page--gray page--login'>

      <header className='header'>
        <div className='container'>
          <Header />
        </div>
      </header>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>

          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form className='login__form form' onSubmit={handleSubmit}>

              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input className='login__input form__input' type='email' name='email' placeholder='Email' required />
              </div>

              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input className='login__input form__input' type='password' name='password' placeholder='Password' required />
              </div>
              {error && <p style={{color: 'red'}}>{error}</p>}

              <button className='login__submit form__submit button' type='submit'>Sign in</button>

            </form>
          </section>

          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link className='locations__item-link' to='#'>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}

export default LoginPage;
