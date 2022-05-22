import React, {
  KeyboardEvent, useEffect, useState,
} from 'react';
import { dispatchAndSave } from '../store';

export default function Header() {
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const { title } = document;
    let timer: ReturnType<typeof setTimeout>;

    if (newTodo) {
      const newTitle = `${'*'.repeat(35)}Added new TODO: ${newTodo}${'*'.repeat(35)}`;
      const setNewTitle = (oldTitle: string) => {
        if (oldTitle.length > 33) {
          document.title = oldTitle;
          timer = setTimeout(setNewTitle, 100, oldTitle.slice(1));
        } else {
          timer = setTimeout(() => { document.title = title; });
          setNewTodo('');
        }
      };
      setNewTitle(newTitle);
    }

    return (() => {
      clearTimeout(timer);
      document.title = title;
    });
  });

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      setNewTodo(input.value);
      dispatchAndSave({
        type: 'todo/add',
        payload: {
          todo: {
            id: Date.now().toString(),
            title: input.value,
            completed: false,
          },
        },
      });
      input.value = '';
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={handleKeyEvent}
      />
    </header>
  );
}
