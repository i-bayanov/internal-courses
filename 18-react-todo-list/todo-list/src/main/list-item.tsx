import React, { KeyboardEvent, useState } from 'react';
import { ITodoItem } from '../interfaces-and-types';
import { dispatchAndSave } from '../store';

export default function ListItem(props: ITodoItem) {
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const handleIfEnterPressed = (e: KeyboardEvent) => {
    if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
  };

  const EditTodo = () => (
    <input
      className='edit'
      defaultValue={props.title}
      autoFocus
      onBlur={(e) => {
        const input = e.target;
        if (input.value !== props.title) {
          dispatchAndSave({
            type: 'todo/edit',
            payload: {
              id: props.id,
              value: input.value,
            },
          });
        }
        setIsEdited(false);
      }}
      onKeyDown={handleIfEnterPressed}
    />
  );

  const classNames = [
    props.completed ? 'completed' : '',
    isEdited ? 'editing' : '',
  ].join(' ');

  return (
    <li
      {...{ 'data-id': props.id }}
      className={classNames}
      onDoubleClick={() => setIsEdited(true)}
    >
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          onChange={(e) => dispatchAndSave({
            type: 'todo/toggle',
            payload: {
              id: props.id,
            },
          })}
          checked={props.completed}
        />
        <label>{props.title}</label>
        <button
          className='destroy'
          onPointerDown={() => dispatchAndSave({
            type: 'todo/delete',
            payload: {
              id: props.id,
            },
          })}
        ></button>
      </div>
      {isEdited && <EditTodo />}
    </li>
  );
}
