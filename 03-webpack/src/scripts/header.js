import { avatar } from './avatar.js';
import { createList } from './createlist.js';

const header = document.createElement('header');

header.classList.add('header');
header.innerHTML = `
  <div class="head">
    <div class="logo">
      <svg  viewBox="0 0 133 120" height="28" width="30">
        <g id="logo">
          <rect x="3" y="3" width="26" height="26" rx="10" />
          <rect x="3" y="47" width="26" height="26" rx="10" />
          <rect x="3" y="91" width="26" height="26" rx="10" />
          <line x1="47" y1="16" x2="130" y2="16" />
          <line x1="47" y1="60" x2="130" y2="60" />
          <line x1="47" y1="104" x2="130" y2="104" />
        </g>
      </svg>
      <span class="logo_name">Awesome Kanban Board</span>
    </div>
    <button type="button" class="add_list">
      <svg viewBox="0 0 22 22" height="22" width="22">
        <path id="add" d="M11 0C4.9 0 0 4.9 0 11C0 17.1 4.9 22 11
          22C17.1 22 22 17.1 22 11C22 4.9 17.1 0 11 0ZM16 13H13V16C13
          17.1 12.1 18 11 18C9.9 18 9 17.1 9 16V13H6C4.9 13 4 12.1 4
          11C4 9.9 4.9 9 6 9H9V6C9 4.9 9.9 4 11 4C12.1 4 13 4.9 13
          6V9H16C17.1 9 18 9.9 18 11C18 12.1 17.1 13 16 13Z" />
      </svg>
      <div>Create new list</div>
    </button>
  </div>
  <button class="user_menu">
    ${avatar}
    <svg class="arrow" viewBox="0 0 17 10" height="8" width="12">
      <g id="arrow">
        <polyline points="1,1 8,8 15,1" fill="none" stroke="white" stroke-width="3" />
      </g>
    </svg>
  </button>
`;

document.body.prepend(header);
header.querySelector('.add_list').addEventListener('click', createList);
