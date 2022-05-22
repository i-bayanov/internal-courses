import React, { PointerEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dispatchAndSave, RootState } from '../store';

export default function Footer() {
  const todos = useSelector((state: RootState) => state);
  const todoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className='footer'>
      <span className='todo-count'>
        {todoCount} item{todoCount === 1 ? '' : 's'} left
      </span>
      <ul className='filters'>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >All</NavLink>
        </li>
        <li>
          <NavLink
            to='/active'
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >Active</NavLink>
        </li>
        <li>
          <NavLink
            to='/completed'
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >Completed</NavLink>
        </li>
      </ul>
      <button
        className='clear-completed'
        style={{ display: 'block' }}
        onPointerDown={(() => dispatchAndSave({
          type: 'clearCompleted',
        })) as PointerEventHandler}
      >Clear completed</button>
    </footer>
  );
}
