const dataMock = [
  {
    title: 'backlog',
    issues: [
      {
        id: 'task1',
        name: 'Login page – performance issues',
      },
      {
        id: 'task2',
        name: 'Sprint bugfix',
      },
    ],
  },
  {
    title: 'ready',
    issues: [
      {
        id: 'task3',
        name: 'Shop page – performance issues',
      },
      {
        id: 'task4',
        name: 'Checkout bugfix',
      },
      {
        id: 'task5',
        name: 'Shop bug1',
      },
      {
        id: 'task6',
        name: 'Shop bug2',
      },
      {
        id: 'task7',
        name: 'Shop bug3',
      },
      {
        id: 'task8',
        name: 'Shop bug4',
      },
      {
        id: 'task9',
        name: 'Shop bug5',
      },
      {
        id: 'task10',
        name: 'Shop bug6',
      },
      {
        id: 'task11',
        name: 'Shop page – performance issues',
      },
    ],
  },
  {
    title: 'inProgress',
    issues: [
      {
        id: 'task12',
        name: 'User page – performance issues',
      },
      {
        id: 'task13',
        name: 'Auth bugfix',
      },
    ],
  },
  {
    title: 'finished',
    issues: [
      {
        id: 'task14',
        name: 'Main page – performance issues',
      },
      {
        id: 'task15',
        name: 'Main page bugfix',
      },
    ],
  },
];

if (!localStorage.getItem('tasks')) {
  localStorage.setItem('tasks', JSON.stringify(dataMock));
}
