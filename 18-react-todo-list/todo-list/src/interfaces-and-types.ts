export interface ITodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface IAction {
  type: string;
  payload?: {
    todo?: ITodoItem;
    id?: string;
    value?: string;
    toggler?: boolean;
  };
}
