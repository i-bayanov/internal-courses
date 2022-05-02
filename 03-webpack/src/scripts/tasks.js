import { taskLists } from './renderer.js';
import { renderer } from './renderer.js';

const addCardButtons = document.getElementsByClassName('addCard');
const lists = document.getElementsByClassName('taskList');
const newTaskInput = document.createElement('input');
const prevTasksList = document.createElement('div');

export const addTask = (event) => {
  for (let i= 0; i < addCardButtons.length; i++) {
    addCardButtons[i].removeEventListener('click', addTask);
    addCardButtons[i].disabled = true;
  }
  if (document.querySelector('.main').firstChild.contains(event.currentTarget)) {
    newTaskInput.type = 'text';
    newTaskInput.name = 'description';
    newTaskInput.placeholder = 'Describe new task';
    newTaskInput.classList.add('task', 'newTaskInput');
    event.currentTarget.parentNode.querySelector('.listOfTasks').appendChild(newTaskInput);
    newTaskInput.addEventListener('blur', saveTask);
    newTaskInput.focus();
  } else {
    prevTasksList.innerHTML = '';
    prevTasksList.className = '';
    prevTasksList.style.top = '';
    prevTasksList.style.bottom = '';
    let prevTasks = [];
    for (let i = 1; i < taskLists.length; i++) {
      if (taskLists[i].title === event.currentTarget.parentNode.classList[1]) {
        prevTasks = taskLists[i - 1].issues;
      }
    }
    prevTasksList.classList.add('prevTasksList');
    prevTasksList.appendChild(document.createElement('ul'));
    for (let i = 0; i < prevTasks.length; i++) {
      const task = document.createElement('li');
      task.classList.add('task');
      task.addEventListener('click', moveTask);
      task.innerText = `${prevTasks[i].name}`;
      prevTasksList.firstElementChild.appendChild(task);
    }

    const buttonPos = event.currentTarget.getBoundingClientRect().top;
    if (buttonPos > document.body.clientHeight - 400) {
      prevTasksList.classList.add('prevTasksListUp');
      prevTasksList.style.bottom = `-${document.body.clientHeight - 100 - buttonPos}px`;
      prevTasksList.classList.remove('prevTasksList');
    } else {
      prevTasksList.style.top = `${buttonPos - 30}px`;
    }
    event.currentTarget.parentNode.appendChild(prevTasksList);
    setTimeout(() => document.addEventListener('click', isClickInsidePrevTasksList));
  }
}

const saveTask = () => {
  const newTask = document.createElement('li');
  newTask.classList.add('task');

  if (newTaskInput.value) {
    taskLists[0].issues.push({name: `${newTaskInput.value}`});
    localStorage.setItem('tasks', JSON.stringify(taskLists));
    renderer();
  } else {
    document.querySelector('.main').firstChild.querySelector('.listOfTasks').removeChild(newTaskInput);
  }
  newTaskInput.value = '';
  for (let i = 0; i < addCardButtons.length; i++) {
    if ((i > 0) && (taskLists[i-1].issues.length === 0)) {
      addCardButtons[i].disabled = true;
    } else {
      addCardButtons[i].addEventListener('click', addTask);
      addCardButtons[i].disabled = false;
    }
  }
}

const removeTaskList = () => {
  prevTasksList.parentNode.removeChild(prevTasksList);
  document.removeEventListener('click', isClickInsidePrevTasksList);
  for (let i= 0; i < addCardButtons.length; i++) {
    if ((i > 0) && (taskLists[i-1].issues.length === 0)) {
      addCardButtons[i].disabled = true;
    } else {
      addCardButtons[i].addEventListener('click', addTask);
      addCardButtons[i].disabled = false;
    }
  }
}

const isClickInsidePrevTasksList = (event) => {
  let inside = prevTasksList.contains(event.target);
  if (!inside) {
    removeTaskList();
  }
}

const moveTask = (event) => {
  const movedTaskText = event.currentTarget.innerText;
  let destinationListTitle = '';
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].contains(event.currentTarget)) {
      destinationListTitle = lists[i].classList[1];
    }
  }
  for (let i = 0; i < taskLists.length; i++) {
    if (taskLists[i].title === destinationListTitle) {
      let index = taskLists[i - 1].issues.findIndex(element => element.name === movedTaskText);
      taskLists[i].issues.push(taskLists[i - 1].issues.splice(index, 1)[0]);
    }
  }
  document.removeEventListener('click', isClickInsidePrevTasksList);
  localStorage.setItem('tasks', JSON.stringify(taskLists));
  renderer();
}
