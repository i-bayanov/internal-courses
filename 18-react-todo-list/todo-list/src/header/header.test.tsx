import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import Header from './header';
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

describe('Header component', () => {
  it('should renders correctly', () => {
    render(<Header />, container!);
    expect(container).toMatchSnapshot();
  });

  it('should change document title when new too added', (done) => {
    jest.useFakeTimers();
    const spy = jest.spyOn(store, 'dispatchAndSave');
    const newTitle = '***********************************Added new TODO: New Todo***********************************';

    render(<Header />, container!);
    const input = container?.querySelector('.new-todo') as HTMLInputElement;
    input.value = 'New Todo';
    jest.setSystemTime(1652355429278);
    input.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    }));
    expect(spy).toHaveBeenCalledWith({
      type: 'todo/add',
      payload: {
        todo: {
          id: String(1652355429278),
          title: 'New Todo',
          completed: false,
        },
      },
    });
    jest.useRealTimers();
    jest.restoreAllMocks();
    setTimeout(() => {
      expect(document.title).toBe(newTitle);
      done();
    });
  });
});
