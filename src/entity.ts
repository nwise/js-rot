export class Entity {
  constructor(
    public x: number,
    public y: number,
    public char: string,
    public fg: string = '#fff',
    public bg: string = '#000',
    public name: string = '<Unnamed>',
    public blocksMovement: boolean = false,
  ) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.bg = bg;
    this.fg = fg;
  }

  move(distanceX: number, distanceY: number) {
    this.x += distanceX;
    this.y += distanceY;
  }
}

export function spawnPlayer(x: number, y: number) {
  return new Entity(x, y, '@', '#fff', '#000', 'Player', true);
}

export function spawnOrc(x: number, y: number) {
  return new Entity(x, y, 'o', '#3f7f3f', '#000', 'Orc', true);
}

export function spawnTroll(x: number, y: number) {
  return new Entity(x, y, 'T', '#007f00', '#000', 'Troll', true);
}
