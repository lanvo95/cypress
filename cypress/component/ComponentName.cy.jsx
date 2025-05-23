// describe('ComponentName.cy.jsx', () => {
//   it('playground', () => {
//     // cy.mount()
//   })
// })

import React from 'react';
import { mount } from 'cypress/react';

function Button({ label }) {
  return <button>{label}</button>;
}

describe('Button component', () => {
  it('renders with correct label', () => {
    mount(<Button label="Click me" />);
    cy.contains('Click me').should('exist');
  });
});
