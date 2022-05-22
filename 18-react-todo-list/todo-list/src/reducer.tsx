import { IAction, ITodoItem } from './interfaces-and-types';

const initialState: Array<ITodoItem> = JSON.parse(localStorage.getItem('todos') as string) || [];

// eslint-disable-next-line default-param-last
export default function todoReducer(store: Array<ITodoItem> = initialState, action: IAction) {
  const todo = action.payload?.todo || null;
  const id = action.payload?.id || null;
  const value = action.payload?.value || null;
  const toggler = action.payload?.toggler ?? null;

  switch (action.type) {
    case 'todo/add':
      return [...store, todo] as Array<ITodoItem>;
    case 'todo/delete':
      return store.filter((todoItem) => todoItem.id !== id);
    case 'todo/edit':
      return store.map((todoItem) => (todoItem.id === id
        ? { ...todoItem, title: value }
        : todoItem)) as Array<ITodoItem>;
    case 'todo/toggle':
      return store.map((todoItem) => (todoItem.id === id
        ? { ...todoItem, completed: !todoItem.completed }
        : todoItem)) as Array<ITodoItem>;
    case 'toggleAll':
      return store.map((todoItem) => ({ ...todoItem, completed: toggler })) as Array<ITodoItem>;
    case 'clearCompleted':
      return store.filter((todoItem) => !todoItem.completed);
    default:
      return store;
  }
}
