import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PlacesSorting from './places-sorting';
import { SortingType } from '../../../const';

describe('Component: PlacesSorting', () => {
  it('should close sorting options after selecting option', () => {
    render(
      <PlacesSorting
        currentSorting={SortingType.Popular}
        onSortingChange={() => {}}
      />
    );

    const button = screen.getAllByText(SortingType.Popular)[0];

    fireEvent.click(button);

    const list = document.querySelector('.places__options')!;

    expect(list.className).toContain('opened');

    fireEvent.click(screen.getByText(SortingType.PriceLowToHigh));

    expect(list.className).not.toContain('opened');
  });

  it('should open sorting options on click', () => {
    render(
      <PlacesSorting
        currentSorting={SortingType.Popular}
        onSortingChange={() => {}}
      />
    );

    const sortingButton = screen.getAllByText('Popular')[0];

    fireEvent.click(sortingButton);

    const list = screen.getByRole('list');
    expect(list.className).toContain('places__options--opened');
  });

  it('should call onSortingChange when option is clicked', () => {
    const mockChange = vi.fn();

    render(
      <PlacesSorting
        currentSorting={SortingType.Popular}
        onSortingChange={mockChange}
      />
    );

    fireEvent.click(screen.getAllByText(SortingType.Popular)[0]);

    fireEvent.click(screen.getByText(SortingType.PriceLowToHigh));

    expect(mockChange).toHaveBeenCalledWith(SortingType.PriceLowToHigh);
  });

});
