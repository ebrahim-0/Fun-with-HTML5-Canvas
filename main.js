const canvas = document.querySelector(".draw");

const ctx = canvas.getContext("2d");
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#bada55";
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 10;

let isDrawing = false;
let lastX;
let lastY;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;
  console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.lineWidth = hue;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseout", () => (isDrawing = false));
canvas.addEventListener("mouseup", () => (isDrawing = false));
