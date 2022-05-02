import { addTask } from './tasks.js';
import { showContext } from './showcontext.js';
import './tasklist.js';

export const taskLists = JSON.parse(localStorage.getItem('tasks'));

export const renderer = () => {
  const main = document.querySelector('.main');

  main.innerHTML = '';

  if (!taskLists.length) {
    main.innerHTML = `
      <div></div>
      <div class="taskList empty">
        <div>There are no task lists.</div>
        <br>
        <div>Create a new list.</div>
      </div>
      <div></div>
    `;
  }

  for (let key = 0; key < taskLists.length; key++) {
    main.insertAdjacentHTML('beforeend', `<task-list title="${taskLists[key].title}"></task-list>`);

    const currentList = document.getElementsByClassName('taskList')[key];
    const addCard = currentList.querySelector('.addCard');
    const listOfTasks = currentList.querySelector('.listOfTasks');
    const context = currentList.querySelector('.context');

    context.addEventListener('click', showContext);

    if ((key > 0) && (taskLists[key-1].issues.length === 0)) {
      addCard.disabled = true;
    } else {
      addCard.addEventListener('click', addTask);
    }

    for (let i = 0; i < taskLists[key].issues.length; i++) {
      const task = document.createElement('li');
      task.classList.add('task');
      task.innerText = `${taskLists[key].issues[i].name}`;
      listOfTasks.append(task);
    }
  }

  main.insertAdjacentHTML('beforeend', '<div class="corrector"></div>');

  const finished = document.getElementById('finished');
  const active = document.getElementById('active');
  finished.innerText = '0';
  active.innerText = '0';
  let doneTasks = taskLists[taskLists.length - 1].issues.length;
  doneTasks = doneTasks > 0 ? doneTasks : 0;
  finished.innerText = `${doneTasks}`;
  let inWork = taskLists.reduce((sum, current) => sum + current.issues.length, 0) - taskLists[0].issues.length - doneTasks;
  inWork = inWork > 0 ? inWork : 0;
  active.innerText = `${inWork}`;
}

renderer();
