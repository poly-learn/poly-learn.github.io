let inputDir = { x: 0, y: 0 };
let prevInputDir = { x: 0, y: 0 };

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    if (prevInputDir.y === 0) inputDir = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    if (prevInputDir.y === 0) inputDir = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' || event.key === 'a') {
    if (prevInputDir.x === 0) inputDir = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' || event.key === 'd') {
    if (prevInputDir.x === 0) inputDir = { x: 1, y: 0 };
  }
});

export function getInputDir() {
  prevInputDir = inputDir;
  return inputDir;
}

export function resetInputDir() {
  inputDir = { x: 0, y: 0 };
}
