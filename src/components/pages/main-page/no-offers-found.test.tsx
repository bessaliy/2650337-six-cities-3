import {render, screen} from '@testing-library/react';
import NoOffersFound from './no-offers-found.tsx';
import {CITIES} from '../../../const.ts';

describe('Component: NoOffersFound', () => {
  it('should render NoOffersFound correctly', () => {
    render(<NoOffersFound city={CITIES[0]} />);

    expect(screen.getByText(/No places to stay available/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(CITIES[0].name, 'i'))).toBeInTheDocument();
  });
});
