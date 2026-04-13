import {vi} from 'vitest';
import {render, screen} from '@testing-library/react';
vi.mock('./place-card.tsx', () => ({
  default: () => <div data-testid="place-card" />,
}));
import PlaceCardList from './place-card-list.tsx';
import {MockData} from '../../mock/mock-data.ts';

describe('Component: PlaceCardList', () => {
  it('should render correct number of place cards', () => {
    render(<PlaceCardList offers={MockData} onHoverToggle={() => {}} />);

    expect(screen.getAllByTestId('place-card')).toHaveLength(MockData.length);
  });
});
