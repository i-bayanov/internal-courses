/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { configureStore } from '@reduxjs/toolkit';

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { STORE, testRender } from './test-utils';
import todoReducer from './reducer';
import * as store from './store';
import App from './app';
import { IAction } from './interfaces-and-types';

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
    testRender(<App />, container!);
    expect(container).toMatchSnapshot();
  });
});

describe('Let\'s act with todo list and add some todos, mark them as completed, delete one etc.', () => {
  const mockStore = configureStore({ reducer: todoReducer, preloadedState: STORE });

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render((
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    ));

    const spyDispatchAndSave = jest.spyOn(store, 'dispatchAndSave');
    spyDispatchAndSave.mockImplementation((action: IAction) => {
      mockStore.dispatch(action);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should add "New todo"', () => {
    const input = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    input.value = 'New todo';
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getAllByRole('listitem').filter((item) => item.dataset.id)).toHaveLength(5);
  });

  it('should delete todo with label "-"', () => {
    const todoToDelete = screen.getByText('-');
    const destroyButton = todoToDelete.nextElementSibling as HTMLButtonElement;
    fireEvent.pointerDown(destroyButton);

    expect(screen.getAllByRole('listitem').filter((item) => item.dataset.id)).toHaveLength(4);
  });

  it('should edit todo', () => {
    const todoToEdit = screen.getByText('Come up with an interesting third point');
    fireEvent.doubleClick(todoToEdit);
    const input = screen.getByDisplayValue('Come up with an interesting third point') as HTMLInputElement;
    input.value = 'Come up with the usual third point';
    fireEvent.blur(input);

    expect(screen.getByText('Come up with the usual third point')).toBeInTheDocument();
  });

  it('should mark todo as completed', () => {
    const todoToToggle = screen.getByText('Come up with the usual third point');
    const toggler = todoToToggle.previousElementSibling as HTMLInputElement;
    fireEvent.click(toggler);

    expect(screen.getByText(/left/i).textContent).toBe('1 item left');
  });

  it('should display only incompleted todos if "Active" filter is pressed', () => {
    const activeFilterButton = screen.getByText('Active');
    fireEvent.click(activeFilterButton);

    expect(screen.getAllByRole('listitem').filter((item) => item.dataset.id)).toHaveLength(1);
    expect(window.location.pathname).toBe('/active');
  });

  it('should display only completed todos if "Completed" filter is pressed', () => {
    const completedFilterButton = screen.getByText('Completed');
    fireEvent.click(completedFilterButton);

    expect(screen.getAllByRole('listitem').filter((item) => item.dataset.id)).toHaveLength(3);
    expect(window.location.pathname).toBe('/completed');
  });

  it('should display all todos if "All" filter is pressed', () => {
    const allFilterButton = screen.getByText('All');
    fireEvent.click(allFilterButton);

    expect(screen.getAllByRole('listitem').filter((item) => item.dataset.id)).toHaveLength(4);
    expect(window.location.pathname).toBe('/');
  });

  it('should mark all todos as completed', () => {
    const toggler = screen.getByLabelText('Mark all as completed');
    fireEvent.click(toggler);

    expect(screen.getByText(/left/i).textContent).toBe('0 items left');
  });

  it('should mark all todos as incompleted', () => {
    const toggler = screen.getByLabelText('Mark all as completed');
    fireEvent.click(toggler);

    expect(screen.getByText(/left/i).textContent).toBe('4 items left');
  });

  it('should mark all todos as completed and clear list', () => {
    const toggler = screen.getByLabelText('Mark all as completed');
    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(toggler);
    fireEvent.pointerDown(clearButton);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
