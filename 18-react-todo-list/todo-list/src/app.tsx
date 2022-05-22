import React, { useState } from 'react';
import { ITodoItem } from './interfaces-and-types';
import StateContext from './state-context';
import Header from './header/header';
import Main from './main/main';

export default function App() {
  const [todos, setTodos] = useState<ITodoItem[] | []>(
    JSON.parse(localStorage.getItem('todos') as string) || [],
  );

  const [filter, setFilter]: [number, Function] = useState({
    '': 0, '#/': 0, '#/active': 1, '#/completed': 2,
  }[window.location.hash] || 0);

  const identifyTodoAndMakeNewTodos = (id: string, oldTodos: Array<ITodoItem>) => {
    const index = oldTodos.findIndex((todo) => todo.id === id);
    const newTodos = [...oldTodos];

    return [index, newTodos] as [number, Array<ITodoItem>];
  };

  const addTodo = (todo: ITodoItem) => {
    const newTodos = [...todos, todo];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const edit = (id: string, value: string) => {
    const [index, newTodos] = identifyTodoAndMakeNewTodos(id, todos);
    newTodos[index].title = value;
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const toggle = (id: string, toggler: boolean) => {
    const [index, newTodos] = identifyTodoAndMakeNewTodos(id, todos);
    newTodos[index].completed = toggler;
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const toggleAll = (toggler: boolean) => {
    const newTodos = [...todos];
    // eslint-disable-next-line no-param-reassign
    newTodos.forEach((todo) => { todo.completed = toggler; });
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    const [index, newTodos] = identifyTodoAndMakeNewTodos(id, todos);
    newTodos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const filterTodos = (hash: string) => {
    window.location.hash = hash;
    setFilter({ '#/': 0, '#/active': 1, '#/completed': 2 }[hash] || 0);
  };

  const clearComplited = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const contextValue = {
    todos,
    filter,
    addTodo,
    edit,
    toggle,
    toggleAll,
    deleteTodo,
    filterTodos,
    clearComplited,
  };

  return (
    <StateContext.Provider value={contextValue}>
      <section className="todoapp">
        <Header />
        {!!todos.length && <Main />}
      </section>
    </StateContext.Provider>
  );
}
