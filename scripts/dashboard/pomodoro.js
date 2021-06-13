import { currentTab, displayOnly, selectOne } from "./dashboard.js";
const numberSpinners = {
  working: document.querySelector('.working'),
  resting: document.querySelector('.resting')
};

const gameTab = document.getElementById('game-btn');

let currentTime = 0;

Object.values(numberSpinners).forEach((numberSpinner) => {
  const next = numberSpinner.querySelector('.next');
  const prev = numberSpinner.querySelector('.prev');
  const display = numberSpinner.querySelector('#number-spinner-box > span');
  next.addEventListener('click', () => {
    if (
      parseInt(display.innerHTML) < parseInt(numberSpinner.getAttribute('max'))
    ) {
      display.innerHTML = parseInt(display.innerHTML) + 1;
      drawDonut();
    }
  });
  prev.addEventListener('click', () => {
    if (
      parseInt(display.innerHTML) > parseInt(numberSpinner.getAttribute('min'))
    ) {
      display.innerHTML = parseInt(display.innerHTML) - 1;
      drawDonut();
    }
  });
});

const workingTime = document.querySelector(
  '.working > #number-spinner-box > span'
);

const restingTime = document.querySelector(
  '.resting > #number-spinner-box > span'
);

const clockCanvas = document.getElementById('clock-canvas');

function getWorkingTime() {
  return parseInt(workingTime.innerHTML);
}
function getRestingTime() {
  return parseInt(restingTime.innerHTML);
}

function drawHand() {
  const totalTime = getWorkingTime() + getRestingTime();
  const from = [clockCanvas.width / 2, clockCanvas.height / 2];
  const handRadians = 2 * Math.PI * (currentTime / totalTime);
  const to = [
    Math.cos(handRadians - Math.PI / 2) * 230 + clockCanvas.width / 2,
    Math.sin(handRadians - Math.PI / 2) * 230 + clockCanvas.height / 2
  ];

  var ctx = clockCanvas.getContext('2d');
  ctx.strokeStyle = '#666666';
  ctx.fillStyle = '#666666';

  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(...from);
  ctx.lineTo(...to);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(
    clockCanvas.width / 2,
    clockCanvas.height / 2,
    10,
    10,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function drawDonut() {
  const restingRatio = getRestingTime() / (getWorkingTime() + getRestingTime());
  const ctx = clockCanvas.getContext('2d');
  ctx.strokeStyle = '#9DADE5';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(
    clockCanvas.width / 2,
    clockCanvas.height / 2,
    240,
    -Math.PI / 2,
    (3 / 2) * Math.PI - 2 * Math.PI * restingRatio
  );
  ctx.stroke();
  ctx.strokeStyle = '#F6A97C';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(
    clockCanvas.width / 2,
    clockCanvas.height / 2,
    240,
    (3 / 2) * Math.PI - 2 * Math.PI * restingRatio,
    -Math.PI / 2
  );
  ctx.stroke();
}

function draw() {
  const ctx = clockCanvas.getContext('2d');
  ctx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
  drawDonut();
  drawHand();
  renderDigitalTimer();
}

let isTimerRunning = false;
const pomodoroSwitch = document.querySelector('.pomodoro-switch > input');
const pomodoroReset = document.getElementById('pomodoro-reset');
const digitalTimerDisplay = document.getElementById('digital-clock-display');

pomodoroSwitch.addEventListener('click', statusToggled);
pomodoroReset.addEventListener('click', resetTimer);

function statusToggled() {
  if (pomodoroSwitch.checked) startTimer();
  else stopTimer();
}

function startTimer() {
  isTimerRunning = true;
}

function stopTimer() {
  isTimerRunning = false;
}

function resetTimer() {
  stopTimer();
  currentTime = 0;
  pomodoroSwitch.checked = false;
  draw();
}

let lastRenderTime = 0;
let isPreviouslyWorking = true;

function timerLoop(currentRenderTime) {
  if (isTimerRunning) {
    const totalTime = getWorkingTime() + getRestingTime();
    currentTime += (currentRenderTime - lastRenderTime) / 1000 / 60;

    if (currentTime >= totalTime) {
      currentTime = 0;
    }

    const isCurrentlyWorking = currentTime < getWorkingTime();

    if (isPreviouslyWorking != isCurrentlyWorking) {
      if (!isCurrentlyWorking) {
        alert('It\'s time to take a rest! Games have been unlocked so you can relax!');
        gameTab.classList.remove('hidden');
      } else if (isCurrentlyWorking) {
        alert('It\'s time to work!');
        gameTab.classList.add('hidden');
        if (currentTab == 'game') {
          selectOne('pomodoro');
          displayOnly('pomodoro');
        }
      }
    }

    isPreviouslyWorking = isCurrentlyWorking;

    draw();
  }
  lastRenderTime = currentRenderTime;
  window.requestAnimationFrame(timerLoop);
}

function renderDigitalTimer() {
  const currentMs = currentTime * 1000 * 60;
  const timeOfNextRest = getWorkingTime() * 1000 * 60;
  const timeOfNextWork = (getWorkingTime() + getRestingTime()) * 1000 * 60;
  const timeOfNextEvent = currentMs > timeOfNextRest ? timeOfNextWork : timeOfNextRest;
  const timeUntilNextEvent = timeOfNextEvent - currentMs;

  const nextEvent = currentMs > timeOfNextRest ? 'work' : 'rest';

  const sec = Math.floor(timeUntilNextEvent / 1000) % 60;
  const min = Math.floor(timeUntilNextEvent / 1000 / 60);
  digitalTimerDisplay.innerHTML = `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)} until ${nextEvent}`;
}

window.requestAnimationFrame(timerLoop);

draw();
