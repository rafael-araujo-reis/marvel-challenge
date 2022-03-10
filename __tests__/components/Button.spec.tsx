// Renderizar o componente passando suas props
// Fazer uma query ou um mock
// Executar alguma ação
// Descrever o resultado esperado
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonTest, Button } from '../../src/components/Button';

describe('Button component tests', () => {
  it('render without crashing ', () => {

    render(<ButtonTest size="default" />);

    const button = screen.getByTestId('pure_button');

    expect(button).toBeInTheDocument();
  });
});

// describe('Button component test', () => {
//   let buttonProps;
//
//   beforeEach(() => {
//     buttonProps = {
//       titleButton: 'Test',
//       colorTitle: '#FFFFFF',
//       bgColor: '#000000',
//       onClick: () => console.log('test log')
//     };
//   });
//
//   test('should render component', () => {
//     const { getByText } = render(<Button {...buttonProps} />);
//   });
// });