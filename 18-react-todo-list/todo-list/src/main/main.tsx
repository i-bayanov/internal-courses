import React from 'react';
import { useSelector } from 'react-redux';
import ListItem from './list-item';
import Footer from './footer';
import { dispatchAndSave, RootState } from '../store';

export default function Main({ filter }: {filter: number}) {
  const todos = useSelector((state: RootState) => state);
  const filteredTodos = todos.filter((todo) => ([true, !todo.completed, todo.completed][filter]));

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={(e) => dispatchAndSave({
          type: 'toggleAll',
          payload: {
            toggler: e.target.checked,
          },
        })}
        checked={filteredTodos.every((todo) => todo.completed)}
      />
      <label htmlFor="toggle-all">Mark all as completed</label>
      <ul className='todo-list'>
        {filteredTodos.map((todo) => <ListItem
          key={todo.id}
          {...todo}
        />)}
      </ul>
      <Footer />
    </section>
  );
}
