import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { Setting } from './const.ts';
import {mockData} from './mock/mock-data.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <App offers={mockData} cardsAmount={Setting.cardsAmount} />

  </React.StrictMode>
);
