import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import todoReducer from './reducer';

const STORE = [
  {
    id: '1651234007958',
    title: 'Write a to-do list',
    completed: true,
  },
  {
    id: '1651234009086',
    title: 'Mark the first item as completed',
    completed: true,
  },
  {
    id: '1651234010110',
    title: '-',
    completed: false,
  },
  {
    id: '1651234864772',
    title: 'Come up with an interesting third point',
    completed: false,
  },
];

const mockStore = configureStore({ reducer: todoReducer, preloadedState: STORE });

// eslint-disable-next-line no-undef
const testRender = (component: JSX.Element, container: Element) => render(
  <Provider store={mockStore}>
    <BrowserRouter>
      {component}
    </BrowserRouter>
  </Provider>,
  container,
);

export { STORE, testRender };
