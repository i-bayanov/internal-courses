import React from 'react';
import { ITodoItem } from './interfaces-and-types';
import Header from './header/header';
import Main from './main/main';

export default class App extends React.Component<{}, {todos: Array<ITodoItem>, filter: number}> {
  constructor(props: never) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem('todos') as string) || [],
      filter: {
        '': 0, '#/': 0, '#/active': 1, '#/completed': 2,
      }[window.location.hash] || 0,
    };
    this.addTodo = this.addTodo.bind(this);
    this.edit = this.edit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.delete = this.delete.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
    this.clearComplited = this.clearComplited.bind(this);
  }

  addTodo(todo: ITodoItem) {
    localStorage.setItem('todos', JSON.stringify([...this.state.todos, todo]));
    this.setState((state) => ({
      todos: [...state.todos, todo],
    }));
  }

  edit(id: string, value: string) {
    this.setState((state) => {
      const index = state.todos.findIndex((todo) => todo.id === id);
      const newTodos = [...state.todos];
      newTodos[index].title = value;
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  }

  toggle(id: string, toggler: boolean) {
    this.setState((state) => {
      const index = state.todos.findIndex((todo) => todo.id === id);
      const newTodos = [...state.todos];
      newTodos[index].completed = toggler;
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  }

  toggleAll(toggler: boolean) {
    this.setState((state) => {
      const newTodos = [...state.todos];
      // eslint-disable-next-line no-param-reassign
      newTodos.forEach((todo) => { todo.completed = toggler; });
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  }

  delete(id: string) {
    this.setState((state) => {
      const newTodos = [...state.todos];
      const index = newTodos.findIndex((todo) => todo.id === id);
      newTodos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  }

  filterTodos(hash: string) {
    window.location.hash = hash;
    this.setState({ filter: { '#/': 0, '#/active': 1, '#/completed': 2 }[hash] || 0 });
  }

  clearComplited() {
    this.setState((state) => {
      const newTodos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  }

  render() {
    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        {!!this.state.todos.length && <Main
          todos={this.state.todos.filter((todo) => ([
            true, !todo.completed, todo.completed,
          ][this.state.filter]))}
          edit={this.edit}
          toggle={this.toggle}
          toggleAll={this.toggleAll}
          delete={this.delete}
          filter={this.state.filter}
          filterTodos={this.filterTodos}
          clearComplited={this.clearComplited}
        />}
      </section>
    );
  }
}
