import { getInputDir } from './input.js';

export let snakeSpeed = 10;
export let snakeBody = [{ x: 1, y: 1 }];
export let lastTailPos = snakeBody[0];

export function resetSnake() {
  snakeBody = [{ x: 1, y: 1 }];
}

export function update() {
  const inputDir = getInputDir();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDir.x;
  snakeBody[0].y += inputDir.y;
  lastTailPos = snakeBody[snakeBody.length - 1];
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}

export function isPosOnSnake(position, ignoreHead = false) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index == 0) return false;
    return isPosEqual(segment, position);
  });
}

function isPosEqual(pos1, pos2) {
  return pos1.x == pos2.x && pos1.y == pos2.y;
}
