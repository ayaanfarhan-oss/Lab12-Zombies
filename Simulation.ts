import { Entity } from "./Entity";

export class Simulation {
  entities: Entity[] = [];

  constructor() {
    // humans
    for (let i = 0; i < 30; i++) {
      this.entities.push(
        new Entity(
          Math.random() * 800,
          Math.random() * 600,
          false
        )
      );
    }

    // 1 zombie
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

  getClosest(zombie: Entity, humans: Entity[]) {
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
