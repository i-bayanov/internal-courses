import React, { KeyboardEvent, MouseEvent } from 'react';
import { ITodoItemWithCBs } from '../interfaces-and-types';

export default function ListItem(props: ITodoItemWithCBs) {
  const handleIfEnterPressed = (e: KeyboardEvent) => {
    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
  };

  const EditTodo = () => (
    <input
      style={{ display: 'none' }}
      className='edit'
      onBlur={(e) => {
        const input = e.target;
        if (input.value !== props.title) props.edit(props.id, input.value);
        input.style.display = 'none';
        input.closest('li')!.classList.remove('editing');
      }}
      onKeyDown={handleIfEnterPressed}
    />
  );

  const edit = (e: MouseEvent) => {
    const listItem = (e.target as HTMLElement).closest('li')!;
    listItem.classList.add('editing');
    const input = listItem.querySelector('.edit') as HTMLInputElement;
    input.value = props.title;
    input.style.display = 'unset';
    input.focus();
  };

  return (
    <li {...{ 'data-id': props.id }} className={props.completed ? 'completed' : ''} onDoubleClick={edit}>
      <div className='view'>
        <input className='toggle' type='checkbox' onChange={(e) => props.toggle(props.id, e.target.checked)} checked={props.completed} />
        <label>{props.title}</label>
        <button className='destroy' onPointerDown={() => props.delete(props.id)}></button>
      </div>
      <EditTodo />
    </li>
  );
}
