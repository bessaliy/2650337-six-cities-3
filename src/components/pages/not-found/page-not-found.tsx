import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

import Header from '../../layout/header.tsx';

function PageNotFound(): ReactElement {
  return (
    <div>
      <header className='header'>
        <div className='container'>
          <Header />
        </div>
      </header>

      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
        marginTop: '350px',
      }}
      >
        <div style={{textAlign: 'center'}}>
          <h1 style={{
            fontSize: '30px',
            lineHeight: '1.1875',
            fontWeight: '400',
            fontStyle: 'oblique',
            marginBottom: '50px',
          }}
          >
            404 Not Found
          </h1>
          <p style={{
            marginBottom: '50px',
            padding: '0 28px',
            fontSize: '38px',
            lineHeight: '1.21053',
            fontWeight: '700',
            fontStyle: 'oblique',
            textAlign: 'center',
          }}
          >
            Упс... Такой страницы нет
          </p>
          <Link to={AppRoute.MainPage}>
            <p style={{
              padding: '25px 30px 30px 15px',
              fontSize: '30px',
              lineHeight: '1.1875',
              fontWeight: '700',
              fontStyle: 'oblique',
              color: '#fff',
              backgroundColor: '#4481c3',
              transform: 'skew(-10deg)',
              borderRadius: '2px',
            }}
            >
              Жмякай тут
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default PageNotFound;
