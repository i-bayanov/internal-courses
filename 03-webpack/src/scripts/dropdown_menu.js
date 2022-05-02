const dropDownMenu = document.createElement('div');
const account = document.createElement('div');
const tasks = document.createElement('div');
const hr = document.createElement('hr');
const logOut = document.createElement('div');
const userMenu = document.querySelector('.user_menu');
const arrow = document.querySelector('.arrow');

dropDownMenu.classList.add('dropDownMenu');
account.classList.add('account');
tasks.classList.add('tasks');
hr.classList.add('dropMenuHr');
logOut.classList.add('logOut');

account.innerText = 'My account';
tasks.innerText = 'My tasks';
logOut.innerText = 'Log out';

[account, tasks, hr, logOut].forEach(item => dropDownMenu.appendChild(item));

export const showDropMenu = () => {
  userMenu.appendChild(dropDownMenu);
  arrow.classList.add('active');
  userMenu.removeEventListener('click', showDropMenu);
  setTimeout(() => document.addEventListener('click', isClickInside));
}

const hideDropMenu = () => {
  userMenu.removeChild(dropDownMenu);
  arrow.classList.remove('active');
  document.removeEventListener('click', isClickInside);
  userMenu.addEventListener('click', showDropMenu);
}

const isClickInside = (event) => {
  let inside = dropDownMenu.contains(event.target);
  if (!inside) {
    hideDropMenu();
  }
}

userMenu.addEventListener('click', showDropMenu);
