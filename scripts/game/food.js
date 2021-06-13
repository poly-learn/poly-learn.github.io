import { isPosOnSnake, lastTailPos, snakeBody } from './snake.js';
const scoreboard = document.getElementById('score');

let food = { x: 11, y: 11 };
const growthRate = 1;
let newSegments = 0;

export function update() {
  if (isPosOnSnake(food)) {
    expandSnake(growthRate);
    scoreboard.innerHTML = parseInt(scoreboard.innerHTML) + 1;
    food = getNewFoodPos();
  }
  addNewSegments();
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

export function expandSnake(amount) {
  newSegments += amount;
}

function addNewSegments() {
  if (newSegments > 0) {
    snakeBody.push({ ...lastTailPos });
    newSegments--;
  }
}

function getNewFoodPos() {
  let newPos;
  while (newPos == null || isPosOnSnake(newPos)) {
    newPos = {
      x: Math.ceil(Math.random() * 20),
      y: Math.ceil(Math.random() * 20)
    };
  }
  return newPos;
}
