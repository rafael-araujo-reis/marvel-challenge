import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';


describe('Header component test', () => {
  it('should render the heading', () => {
    render(<Header />);

    const heading = screen.getByText(
      'Test Header component'
    );

    expect(heading).toBeInTheDocument();
  });
});