class Entity {
  constructor(x, y, isZombie = false) {
    this.x = x;
    this.y = y;
    this.isZombie = isZombie;
  }

  distanceTo(other) {
    return Math.sqrt(
      (this.x - other.x) ** 2 +
      (this.y - other.y) ** 2
    );
  }

  moveToward(target, speed) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.x += (dx / dist) * speed;
    this.y += (dy / dist) * speed;
  }
}

class Simulation {
  constructor() {
    this.entities = [];

    for (let i = 0; i < 30; i++) {
      this.entities.push(
        new Entity(Math.random() * 800, Math.random() * 600, false)
      );
    }

    this.entities.push(new Entity(400, 300, true));
  }

  update() {
    const zombies = this.entities.filter(e => e.isZombie);
    const humans = this.entities.filter(e => !e.isZombie);

    for (let z of zombies) {
      let target = this.getClosest(z, humans);

      if (target) {
        z.moveToward(target, 1);

        if (z.distanceTo(target) < 5) {
          target.isZombie = true;
        }
      }
    }
  }

  getClosest(zombie, humans) {
    let closest = null;
    let minDist = Infinity;

    for (let h of humans) {
      const d = zombie.distanceTo(h);
      if (d < minDist) {
        minDist = d;
        closest = h;
      }
    }

    return closest;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
