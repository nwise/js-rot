export class Entity {
  x: number;
  y: number;
  char: string;
  fg: string;
  bg: string;

  constructor(
    x: number,
    y: number,
    char: string,
    fg: string = '#fff',
    bg: string = '#000'
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
