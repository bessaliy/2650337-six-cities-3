import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// 👇 мок redux
vi.mock('react-redux', () => ({
  useSelector: () => 'AUTH', // любое значение
}));

// 👇 мок UserNav
vi.mock('./user-nav', () => ({
  default: () => <div data-testid="user-nav" />,
}));

import Header from './header';

describe('Component: Header', () => {
  it('should render logo link', () => {
    render(
      <MemoryRouter>
        <Header rightSlot={false} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render UserNav when rightSlot is true', () => {
    render(
      <MemoryRouter>
        <Header rightSlot />
      </MemoryRouter>
    );

    expect(screen.getByTestId('user-nav')).toBeInTheDocument();
  });

  it('should not render UserNav when rightSlot is false', () => {
    render(
      <MemoryRouter>
        <Header rightSlot={false} />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('user-nav')).not.toBeInTheDocument();
  });
});
