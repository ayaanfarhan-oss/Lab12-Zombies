export class Entity {
  x: number;
  y: number;
  isZombie: boolean;

  constructor(x: number, y: number, isZombie: boolean = false) {
    this.x = x;
    this.y = y;
    this.isZombie = isZombie;
  }

  distanceTo(other: Entity): number {
    return Math.sqrt(
      (this.x - other.x) ** 2 + (this.y - other.y) ** 2
    );
  }

  moveToward(target: Entity, speed: number) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.x += (dx / dist) * speed;
    this.y += (dy / dist) * speed;
  }
}
