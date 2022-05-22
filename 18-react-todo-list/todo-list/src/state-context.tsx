import React from 'react';
import { ITodoItem } from './interfaces-and-types';

const StateContext = React.createContext({
  todos: [] as Array<ITodoItem>,
  filter: 0,
  addTodo: (todo: ITodoItem) => {},
  edit: (id: string, value: string) => {},
  toggle: (id: string, toggler: boolean) => {},
  toggleAll: (toggler: boolean) => {},
  deleteTodo: (id: string) => {},
  filterTodos: (hash: string) => {},
  clearComplited: () => {},
});

export default StateContext;
