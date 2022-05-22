import React from 'react';
import { IMainProps } from '../interfaces-and-types';
import ListItem from './list-item';
import Footer from './footer';

export default function Main(props: IMainProps) {
  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={(e) => props.toggleAll(e.target.checked)}
        checked={props.todos.every((todo) => todo.completed)}
      />
      <label htmlFor="toggle-all">Mark all as completed</label>
      <ul className='todo-list'>
        {props.todos.map((todo) => <ListItem
          key={todo.id}
          {...todo}
          edit={props.edit}
          toggle={props.toggle}
          delete={props.delete}
        />)}
      </ul>
      <Footer
        todoCount={props.todos.filter((todo) => !todo.completed).length}
        filter={props.filter}
        filterTodos={props.filterTodos}
        clearComplited={props.clearComplited}
      />
    </section>
  );
}
