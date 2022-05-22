import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import ListItem from './list-item';
import { STORE } from '../test-utils';
import * as store from '../store';

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

describe('List item component', () => {
  it('should renders correctly', () => {
    render(<ListItem {...STORE[0]} />, container!);
    expect(container).toMatchSnapshot();
  });

  it('List item component should change on double click', () => {
    const spy = jest.spyOn(store, 'dispatchAndSave');

    render(<ListItem {...STORE[0]} />, container);
    container?.firstElementChild?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    const input = container?.querySelector('.edit') as HTMLInputElement;
    input.value = 'Write a to-do list parapam';
    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    }));
    expect(spy).toHaveBeenCalledWith({
      type: 'todo/edit',
      payload: {
        id: '1651234007958',
        value: 'Write a to-do list parapam',
      },
    });
    jest.restoreAllMocks();
  });
});
