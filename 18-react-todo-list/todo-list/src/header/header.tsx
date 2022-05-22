import React, { KeyboardEvent } from 'react';

export default function Header(props: {addTodo: Function}) {
  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      props.addTodo({
        id: Date.now().toString(),
        title: input.value,
        completed: false,
      });
      input.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyDown={handleKeyEvent} />
    </header>
  );
}
