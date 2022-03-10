import { render, screen } from '@testing-library/react';
import { Card } from '../../src/components/Card';

describe('Card component test', () => {

  test('should render the card', () => {
    render(<Card
      title={'Card test'}
      image={'https://'}
    />);

    const card = screen.getByTestId('pure_card');
    expect(card).toBeInTheDocument();
  });
});