import React, { PointerEvent, PointerEventHandler, useContext } from 'react';
import StateContext from '../state-context';

export default function Footer() {
  const {
    todos, filter, filterTodos, clearComplited,
  } = useContext(StateContext);
  const todoCount = todos.filter((todo) => !todo.completed).length;

  const chooseFilter = (e: PointerEvent) => {
    const { hash } = e.target as HTMLAnchorElement;
    if (window.location.hash === hash) return;
    filterTodos(hash);
  };

  const Anchor = (anchorProps: { href: string, text: string, className?: 'selected' }) => (
    <a
      href={anchorProps.href}
      className={anchorProps.className}
      onPointerDown={chooseFilter}
    >{anchorProps.text}</a>
  );

  return (
    <footer className='footer'>
      <span className='todo-count'>
        {todoCount} item{todoCount === 1 ? '' : 's'} left
      </span>
      <ul className='filters'>
        {(() => {
          const anchorAttrs = [
            { href: '#/', text: 'All' },
            { href: '#/active', text: 'Active' },
            { href: '#/completed', text: 'Completed' },
          ];
          const itemsArr = [];
          for (let i = 0; i < anchorAttrs.length; i++) {
            if (i === filter) {
              itemsArr.push(
                <li key={i}>
                  <Anchor {...anchorAttrs[i]} className='selected' />
                </li>,
              );
            } else {
              itemsArr.push(
                <li key={i}>
                  <Anchor {...anchorAttrs[i]} />
                </li>,
              );
            }
          }
          return itemsArr;
        })()}
      </ul>
      <button
        className='clear-completed'
        style={{ display: 'block' }}
        onPointerDown={clearComplited as PointerEventHandler}
      >Clear completed</button>
    </footer>
  );
}
