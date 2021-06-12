const timer = document.getElementById('stopwatch');
const laps = document.getElementById('stopwatch-laps');

let hr = '00';
let min = '00';
let sec = '00';
let stoptime = true;
let numlaps = 0;

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout('timerCycle()', 1000);
  }
}

function resetTimer() {
  stopTimer();
  hr = '00';
  min = '00';
  sec = '00';
  timer.innerHTML = '00:00:00';
  laps.innerHTML = '';
  numlaps = 0;
}

function lapTime() {
  const newLap = document.createElement('div');
  newLap.innerHTML = `#${numlaps + 1} ${hr}:${min}:${sec}`;
  laps.appendChild(newLap);
  numlaps++;
}
