import { render, screen } from '@testing-library/react';
import Spinner from './spinner.tsx';

describe('Сomponent: Spinner', () => {
  it('should render Spinner correctly', () => {
    render(<Spinner />);

    expect(screen.getByText(/загружаем/i)).toBeInTheDocument();
  });
});
