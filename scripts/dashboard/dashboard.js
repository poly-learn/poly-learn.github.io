import { setGameStatus } from "../game/input.js";

const defaultTab = 'pomodoro';

const buttons = [
  { name: 'pomodoro', obj: document.getElementById('pomodoro-btn') },
  { name: 'todo', obj: document.getElementById('todo-btn') },
  { name: 'calculator', obj: document.getElementById('calculator-btn') },
  { name: 'notes', obj: document.getElementById('notes-btn') },
  { name: 'stopwatch', obj: document.getElementById('stopwatch-btn') },
  { name: 'formulae', obj: document.getElementById('formulae-btn') },
  { name: 'game', obj: document.getElementById('game-btn') }
];

const contents = {
  pomodoro: document.getElementById('pomodoro-content'),
  todo: document.getElementById('todo-content'),
  calculator: document.getElementById('calculator-content'),
  notes: document.getElementById('notes-content'),
  stopwatch: document.getElementById('stopwatch-content'),
  formulae: document.getElementById('formulae-content'),
  game: document.getElementById('game-content')
};

export let currentTab = defaultTab;

displayOnly(defaultTab);
selectOne(defaultTab);

buttons.forEach((btn) => {
  btn.obj.addEventListener('click', () => {
    displayOnly(btn.name);
    selectOne(btn.name);
    currentTab = btn.name;
    setGameStatus(currentTab == 'game');
  });
});

export function displayOnly(name) {
  clearAllContents();
  contents[name].classList.remove('hidden');
}

function clearAllContents() {
  Object.values(contents).forEach((content) => {
    content.classList.add('hidden');
  });
}

function deselectAll() {
  buttons
    .map((btn) => btn.obj)
    .forEach((obj) => {
      obj.classList.remove('selected');
    });
}

export function selectOne(name) {
  deselectAll();
  buttons.find((btn) => btn.name == name).obj.classList.add('selected');
}
