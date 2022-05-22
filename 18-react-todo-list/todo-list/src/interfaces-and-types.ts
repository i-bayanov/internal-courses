export interface ITodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface ITodoItemWithCBs extends ITodoItem {
  edit: Function;
  toggle: Function;
  delete: Function;
}

export interface IMainProps {
  todos: Array<ITodoItem>;
  edit: Function;
  toggle: Function;
  toggleAll: Function;
  delete: Function;
  filter: number;
  filterTodos: Function;
  clearComplited: Function;
}
