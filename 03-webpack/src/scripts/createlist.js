import './tasklist.js';

const main = document.querySelector('.main');
const newListInput = document.createElement('input');

export const createList = () => {
  main.insertAdjacentHTML('afterbegin', `<task-list title="beingCreatedList"></task-list>`);

  newListInput.type = 'text';
  newListInput.name = 'description';
  newListInput.placeholder = 'Name new list';
  newListInput.classList.add('task', 'newTaskInput');

  main.querySelector('.beingCreatedList').querySelector('.taskListHead').firstChild.replaceWith(newListInput);
  newListInput.addEventListener('blur', saveList);
  newListInput.focus();
}

async function saveList () {
  const {taskLists, renderer} = await import('./renderer.js');

  if (newListInput.value) {
    taskLists.unshift({title: saveRightName(newListInput.value), issues: []});
    localStorage.setItem('tasks', JSON.stringify(taskLists));
    renderer();
  } else {
    main.firstChild.remove();
  }
  newListInput.value = '';
}

const saveRightName = (name) => {
  const arr = name.toLowerCase().split(' ');
  const newArr = [];
  
  newArr.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    newArr.push(arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1));
  }
  
  return newArr.join('');
}
