import {vi} from 'vitest';
import {render, screen} from '@testing-library/react';
vi.mock('./location', () => ({
  default: () => <div data-testid='location' />,
}));
import Locations from './locations.tsx';
import {CITIES} from '../../../const.ts';
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

const mockStore = configureStore({
  reducer: {
    offers: () => ({
      city: { name: CITIES[0].name },
    }),
  },
});


describe('Component: Locations', () => {
  it('should render correct amount of locations', () => {
    render(
      <Provider store={mockStore}>
        <Locations />
      </Provider>
    );
    expect(screen.getAllByTestId('location')).toHaveLength(CITIES.length);
  });
});
