import { configureStore } from '@reduxjs/toolkit';
import { IAction } from './interfaces-and-types';
import todoReducer from './reducer';

const store = configureStore({ reducer: todoReducer });

const dispatchAndSave = (action: IAction) => {
  store.dispatch(action);
  localStorage.setItem('todos', JSON.stringify(store.getState()));
};

type RootState = ReturnType<typeof store.getState>;

export { store, dispatchAndSave, RootState };
