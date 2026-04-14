import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import Location from './location';
import {City} from '../../../types/city.ts';
import {vi} from 'vitest';

const mockCity = {
  name: 'Paris',
} as City;

describe('Component: Location', () => {
  it('should render city name correctly', () => {
    render(
      <BrowserRouter>
        <Location city={mockCity} isActive={false} onClick={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /paris/i })).toBeInTheDocument();
  });

  it('should apply active class when isActive is true', () => {
    render(
      <BrowserRouter>
        <Location city={mockCity} isActive onClick={() => {}} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: /paris/i });
    expect(link).toHaveClass('tabs__item--active');
  });

  it('should not have active class when isActive is false', () => {
    render(
      <BrowserRouter>
        <Location city={mockCity} isActive={false} onClick={() => {}} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: /paris/i });
    expect(link).not.toHaveClass('tabs__item--active');
  });
  it('should call onClick with city when clicked', () => {
    const mockClick = vi.fn();

    const city = {
      name: 'Paris',
    } as City;

    render(
      <MemoryRouter>
        <Location
          city={city}
          isActive={false}
          onClick={mockClick}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Paris'));

    expect(mockClick).toHaveBeenCalledWith(city);
  });
});
