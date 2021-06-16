import { setGameStatus } from '../game/input.js';

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

$('#pomodoro-section').load('dashboard-sections/pomodoro.html');
$('#todo-section').load('dashboard-sections/todo.html');
$('#calculator-section').load('dashboard-sections/calculator.html');
$('#notes-section').load('dashboard-sections/notes.html');
$('#stopwatch-section').load('dashboard-sections/stopwatch.html');
$('#formulae-section').load('dashboard-sections/formulae.html');
$('#game-section').load('dashboard-sections/game.html');

const sections = {
  pomodoro: document.getElementById('pomodoro-section'),
  todo: document.getElementById('todo-section'),
  calculator: document.getElementById('calculator-section'),
  notes: document.getElementById('notes-section'),
  stopwatch: document.getElementById('stopwatch-section'),
  formulae: document.getElementById('formulae-section'),
  game: document.getElementById('game-section')
};

console.log(sections);

export let currentTab = defaultTab;

displayTab(defaultTab);

buttons.forEach((btn) => {
  btn.obj.addEventListener('click', () => {
    displayTab(btn.name);
    currentTab = btn.name;
    setGameStatus(currentTab == 'game');
  });
});

export function displayTab(name) {
  displayOnly(name);
  selectOne(name);
}

function displayOnly(name) {
  clearAllsections();
  sections[name].classList.remove('hidden');
}

function clearAllsections() {
  Object.values(sections).forEach((section) => {
    section.classList.add('hidden');
  });
}

function deselectAll() {
  buttons
    .map((btn) => btn.obj)
    .forEach((obj) => {
      obj.classList.remove('selected');
    });
}

function selectOne(name) {
  deselectAll();
  buttons.find((btn) => btn.name == name).obj.classList.add('selected');
}
