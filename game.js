const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "";
let food = {
  x: Math.floor(Math.random() * 29 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};
let score = 0;
let gameLoop;

document.getElementById("start-button").addEventListener("click", startGame);
document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function startGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = "";
  food = {
    x: Math.floor(Math.random() * 29 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };
  score = 0;
  clearInterval(gameLoop);
  gameLoop = setInterval(draw, 100);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? "limegreen" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  if (headX === food.x && headY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 29 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: headX, y: headY };

  if (
    headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(gameLoop);
    alert("Game Over! Final Score: " + score);
    return;
  }

  snake.unshift(newHead);
  document.getElementById("score").innerText = "Score: " + score;
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}
