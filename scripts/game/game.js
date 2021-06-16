import {
  update as updateSnake,
  draw as drawSnake,
  snakeSpeed,
  snakeBody,
  isPosOnSnake,
  resetSnake
} from './snake.js';

import { update as updateFood, draw as drawFood } from './food.js';
import { resetInputDir } from './input.js';

let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');
const scoreboard = document.getElementById('score');

function main(currentTime) {
  if (isDead()) {
    alert('You are dead');
    resetSnake();
    resetInputDir();
    scoreboard.innerHTML = '0';
    draw();
  }

  window.requestAnimationFrame(main);
  const secsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateFood();
  updateSnake();
}

function draw() {
  gameBoard.innerHTML = '';
  drawFood(gameBoard);
  drawSnake(gameBoard);
}

function isDead() {
  return outsideGrid(snakeBody[0]) || isPosOnSnake(snakeBody[0], true);
}

function outsideGrid(pos) {
  return pos.x < 1 || pos.x > 20 || pos.y < 1 || pos.y > 20;
}
