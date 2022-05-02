class TaskList extends HTMLElement {
  connectedCallback() {
    let title = this.getAttribute('title');

    this.classList.add('taskList', `${title}`);

    this.innerHTML = `
      <div class='taskListHead'>
        ${makeRightName(title)}
        <button type="button" title="context menu" class="context">•••</button>
      </div>
      <ul class="listOfTasks"></ul>
      <button type="button" title="add card" class="addCard">
        <svg height="14" width="14">
          <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M1 7h12M7 1v12"></path>
          </g>
        </svg>
        &nbsp;Add card
      </button>
    `;
  }
}

const makeRightName = (name) => {
  const nameArr = name.match(/[A-Z]/g);
  let newName = name;

  if (nameArr) {
    let index = 0;
    for (let elem of nameArr) {
      index = newName.indexOf(elem, index);
      newName = newName.slice(0, index) + ' ' + newName.slice(index);
      index += 2;
    }
  }

  return newName.slice(0, 1).toUpperCase() + newName.slice(1);
}

customElements.define('task-list', TaskList);
