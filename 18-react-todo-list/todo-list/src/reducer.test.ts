import todoReducer from './reducer';
import { STORE } from './test-utils';

const ACTIONS = {
  wrong: {
    type: 'todo/wrong',
    payload: {
      todo: {
        id: '1651234866789',
        title: 'New todo',
        completed: false,
      },
    },
  },
  add: {
    type: 'todo/add',
    payload: {
      todo: {
        id: '1651234866789',
        title: 'New todo',
        completed: false,
      },
    },
  },
  delete: {
    type: 'todo/delete',
    payload: {
      id: '1651234010110',
    },
  },
  edit: {
    type: 'todo/edit',
    payload: {
      id: '1651234864772',
      value: 'Come up with the usual third point',
    },
  },
  toggle: {
    type: 'todo/toggle',
    payload: {
      id: '1651234864772',
    },
  },
  toggleAllToTrue: {
    type: 'toggleAll',
    payload: {
      toggler: true,
    },
  },
  toggleAllToFalse: {
    type: 'toggleAll',
    payload: {
      toggler: false,
    },
  },
  clearCompleted: { type: 'clearCompleted' },
};

describe('Reducer', () => {
  const STORE_WITH_INITIAL = todoReducer(undefined, ACTIONS.wrong);

  it('should use initialValue if no store value is passed', () => {
    expect(STORE_WITH_INITIAL).toEqual([]);
  });

  const STORE_APPLY_WRONG = todoReducer(STORE, ACTIONS.wrong);

  it('should do nothing if type of action is incorrect', () => {
    expect(STORE_APPLY_WRONG).toBe(STORE);
  });

  const STORE_ADD = todoReducer(STORE_APPLY_WRONG, ACTIONS.add);

  it('should add a new todo to the store', () => {
    expect(STORE_ADD).toHaveLength(5);
  });

  const STORE_DELETE = todoReducer(STORE_ADD, ACTIONS.delete);

  it('should delete a todo from the store', () => {
    expect(STORE_DELETE).toHaveLength(4);
    expect(STORE_DELETE.some((item) => item.id === '1651234010110')).toBeFalsy();
  });

  const STORE_EDIT = todoReducer(STORE_DELETE, ACTIONS.edit);

  it('should change value of a todo', () => {
    expect(STORE_EDIT.find((item) => item.id === '1651234864772')!.title).toBe('Come up with the usual third point');
  });

  const STORE_TOGGLE = todoReducer(STORE_EDIT, ACTIONS.toggle);

  it('should toggle status of a todo', () => {
    expect(STORE_TOGGLE.find((item) => item.id === '1651234864772')!.completed).toBeTruthy();
  });

  const STORE_TOGGLEALL = todoReducer(STORE_TOGGLE, ACTIONS.toggleAllToTrue);

  it('should toogle status of all todos', () => {
    expect(STORE_TOGGLEALL.every((item) => item.completed)).toBeTruthy();
    expect(todoReducer(STORE_TOGGLEALL, ACTIONS.toggleAllToFalse)
      .some((item) => item.completed))
      .toBeFalsy();
  });

  it('should clear all completed todos', () => {
    expect(todoReducer(STORE, ACTIONS.clearCompleted)).toHaveLength(2);
    expect(todoReducer(STORE_ADD, ACTIONS.clearCompleted)).toHaveLength(3);
    expect(todoReducer(STORE_DELETE, ACTIONS.clearCompleted)).toHaveLength(2);
    expect(todoReducer(STORE_TOGGLE, ACTIONS.clearCompleted)).toHaveLength(1);
    expect(todoReducer(STORE_TOGGLEALL, ACTIONS.clearCompleted)).toHaveLength(0);
  });
});
