const taskList = document.querySelector('.tasks');
const listList = document.querySelector('.task-list');
const newListName = document.querySelector('.new.list');
const newTaskName = document.querySelector('.new.task');
const listTitle = document.querySelector('.list-title');
const taskRemainingCounter = document.querySelector('.task-count > span');

const newListButton = document.querySelector('.btn.create.create-list');
const newTaskButton = document.querySelector('.btn.create.create-task');

const clearCompletedTasksButton = document.querySelector(
  '.clear-completed-tasks'
);
const deleteCurrentListButton = document.querySelector('.delete-list');

newListButton.addEventListener('click', createList);
newTaskButton.addEventListener('click', createTask);

clearCompletedTasksButton.addEventListener('click', clearCompletedTasks);
deleteCurrentListButton.addEventListener('click', deleteCurrentList);

let lists = [
  {
    name: 'School',
    tasks: [
      {
        name: 'Finish reading to Kill a Mocking Bird',
        done: false
      },
      {
        name: 'Do English coursework',
        done: true
      },
      {
        name: 'Complete AMaths homework',
        done: false
      }
    ]
  }
];

let activeListIndex = 0;

function clearCompletedTasks() {
  const currentList = lists[activeListIndex];
  currentList.tasks = currentList.tasks.filter((t) => !t.done);
  render();
}

function deleteCurrentList() {
  if (lists.length > 1) {
    lists.splice(activeListIndex, 1);
    if (activeListIndex >= lists.length) activeListIndex = lists.length - 1;
    render();
  }
}

function switchList(listIndex) {
  activeListIndex = listIndex;
  render();
}

function toggleTask(taskName) {
  const currentList = lists[activeListIndex];
  const toggledTask = currentList.tasks.find((t) => t.name == taskName);
  const targetChild = Array.from(taskList.children).find(
    (child) => child.querySelector('label').innerText == taskName
  );
  if (toggledTask.done) {
    toggledTask.done = false;
    targetChild.querySelector('input').classList.remove('checked');
  } else {
    toggledTask.done = true;
    targetChild.querySelector('input').classList.add('checked');
  }
  renderHeader();
}

function createList() {
  if (newListName.value != '') {
    lists.push({
      name: newListName.value,
      tasks: []
    });
    activeListIndex = lists.length - 1;
    newListName.value = '';
    render();
  }
}

function createTask() {
  if (newTaskName.value != '') {
    const currentList = lists[activeListIndex];
    currentList.tasks.push({
      name: newTaskName.value,
      done: false
    });
    newTaskName.value = '';
    render();
  }
}

function renderHeader() {
  const currentList = lists[activeListIndex];

  listTitle.innerHTML = currentList.name;
  taskRemainingCounter.innerHTML = currentList.tasks.filter(
    (t) => !t.done
  ).length;
}

function renderLists() {
  listList.innerHTML = '';
  lists.forEach((list, index) => {
    const element = document.createElement('li');
    element.classList.add('list-name');
    if (index == activeListIndex) element.classList.add('active-list');
    element.innerHTML = list.name;

    listList.appendChild(element);

    element.addEventListener('click', () => {
      switchList(index);
    });
  });
}

function renderTasks() {
  taskList.innerHTML = '';
  const currentList = lists[activeListIndex];
  currentList.tasks.forEach((task) => {
    const element = document.createElement('div');
    element.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (task.done) {
      checkbox.classList.add('checked');
    }
    element.appendChild(checkbox);

    const label = document.createElement('label');
    const customCheckbox = document.createElement('span');
    customCheckbox.classList.add('custom-checkbox');
    label.innerHTML = customCheckbox.outerHTML + task.name;
    element.appendChild(label);

    taskList.appendChild(element);

    element.addEventListener('click', () => {
      toggleTask(task.name);
    });
  });
}

function render() {
  renderHeader();
  renderLists();
  renderTasks();
}

render();
