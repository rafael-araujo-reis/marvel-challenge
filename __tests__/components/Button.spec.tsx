import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../../src/components/Button';

describe('Button component tests', () => {

  test('should render the button ', () => {
    render(<Button
      textButton={'Button test'}
      colorText={'#FFFFFF'}
      bgColor={'#700611'}
      onClick={() => { }}
      type={'button'}
    />);

    const button = screen.getByTestId('pure_button');

    expect(button).toBeInTheDocument();
  });
});