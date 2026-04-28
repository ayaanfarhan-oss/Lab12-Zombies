import { Simulation } from "./Simulation";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const sim = new Simulation();

function loop() {
  sim.update();
  draw();
  requestAnimationFrame(loop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let e of sim.entities) {
    ctx.beginPath();
    ctx.arc(e.x, e.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = e.isZombie ? "green" : "black";
    ctx.fill();
  }
}

loop();
