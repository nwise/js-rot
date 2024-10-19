import { Tile } from "./tile-types";
import { WALL_TILE } from "./tile-types";
import { Display } from "rot-js";

export class GameMap {
  width: number;
  height: number;
  display: Display;

  tiles: Tile[][];

  constructor(width: number, height: number, display: Display) {
    this.width = width;
    this.height = height;
    this.display = display;

    this.tiles = new Array(this.height);
    for (let y = 0; y < this.height; y++) {
      const row = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        row[x] = { ...WALL_TILE }
      }
      this.tiles[y] = row;
    }
  }

  isInBounds(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  render() {
    for (let y = 0; y < this.tiles.length; y++) {
      const row = this.tiles[y];
      for (let x = 0; x < row.length; x++) {
        const tile = row[x];
        this.display.draw(x, y, tile.dark.char, tile.dark.fg, tile.dark.bg);
      }
    }
  }

  addRoom(x: number, y: number, roomTiles: Tile[][]) {
    for (let curY = y; curY < y + roomTiles.length; curY++) {
      const mapRow = this.tiles[curY];
      const roomRow = roomTiles[curY - y];
      for (let curX = x; curX < x + roomRow.length; curX++) {
        mapRow[curX] = roomRow[curX - x];

      }
    }
  }
}
