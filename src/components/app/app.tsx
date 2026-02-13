import { ReactElement } from 'react';
import MainPage from '../pages/main-page/main-page.tsx';

type AppProps = {
  cardsAmount: number;
}

function App({cardsAmount}: AppProps): ReactElement {
  return (
    <MainPage cardsAmount={cardsAmount}/>
  );
}

export default App;
