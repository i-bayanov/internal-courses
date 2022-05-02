const footer = document.createElement('footer');

footer.classList.add('footer');
footer.innerHTML = `
  <div class="tasks_number">
    <div>
      Active tasks: <span id="active"></span>
    </div>
    <div>
      Finished tasks: <span id="finished"></span>
    </div>
  </div>
  <div>
    Kanban board by Ilya Bayanov, 2020
  </div>
`;

document.body.append(footer);
