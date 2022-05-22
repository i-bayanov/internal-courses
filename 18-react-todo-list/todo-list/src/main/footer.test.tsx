import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import { testRender } from '../test-utils';
import Footer from './footer';

let container: Element | null = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});

describe('Footer component', () => {
  it('should renders correctly', () => {
    testRender(<Footer />, container!);
    expect(container).toMatchSnapshot();
  });
});
