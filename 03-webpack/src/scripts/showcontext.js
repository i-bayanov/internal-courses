import { renderer, taskLists } from './renderer.js';

const contextMenu = document.createElement('div');
contextMenu.classList.add('taskList', 'context-menu');
contextMenu.innerHTML = 'Delete list';

export const showContext = (event) => {
  for (let el of document.getElementsByClassName('context')) {
    el.removeEventListener('click', showContext);
  }
  event.currentTarget.append(contextMenu);
  contextMenu.addEventListener('click', deleteList);
  setTimeout(() => document.addEventListener('click', isClickInsideContext));
}

const isClickInsideContext = (event) => {
  let inside = contextMenu.contains(event.target);
  if (!inside) {
    hideContext();
  }
}

const hideContext = () => {
  document.querySelector('.context-menu').remove();
  document.removeEventListener('click', isClickInsideContext);
  for (let el of document.getElementsByClassName('context')) {
    el.addEventListener('click', showContext);
  }
}

const deleteList = (event) => {
  const allLists = document.getElementsByClassName('taskList')
  const title = Array.prototype.find.call(allLists, el => el.contains(event.target)).getAttribute('title');

  for (let i = 0; i < taskLists.length; i++) {
    if (taskLists[i].title === title) {
      taskLists.splice(i, 1);
      localStorage.setItem('tasks', JSON.stringify(taskLists));
    }
  }

  document.removeEventListener('click', isClickInsideContext);

  renderer();
}
