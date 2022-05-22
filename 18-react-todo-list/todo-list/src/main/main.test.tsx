import React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import { testRender } from '../test-utils';
import Main from './main';

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

describe('Main component', () => {
  it('should renders correctly', () => {
    testRender(<Main filter={0} />, container!);
    expect(container).toMatchSnapshot();
  });
});
