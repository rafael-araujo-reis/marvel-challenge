import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';

describe('Header component test', () => {
  test('should render the header', () => {
    render(<Header />);

    const header = screen.getByTestId('pure_header');

    expect(header).toBeInTheDocument();
  });
});