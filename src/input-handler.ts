import { Engine } from './engine';
import { Entity } from './entity';

export interface Action {
  perform: (engine: Engine, entity: Entity) => void;
}

export class MovementAction implements Action {
  distanceX: number;
  distanceY: number;

  constructor(distanceX: number, distanceY: number) {
    this.distanceX = distanceX;
    this.distanceY = distanceY;
  }

  perform(engine: Engine, entity: Entity) {
    const destX = entity.x + this.distanceX;
    const destY = entity.y + this.distanceY;

    if (!engine.gameMap.isInBounds(destX, destY)) return;
    if (!engine.gameMap.tiles[destY][destX].walkable) return;
    entity.move(this.distanceX, this.distanceY);
  }
}

interface MovementMap {
  [key: string]: Action;
}

const MOVE_KEYS: MovementMap = {
  ArrowUp: new MovementAction(0, -1),
  ArrowDown: new MovementAction(0, 1),
  ArrowLeft: new MovementAction(-1, 0),
  ArrowRight: new MovementAction(1, 0)
};

export function handleInput(event: KeyboardEvent): Action {
  return MOVE_KEYS[event.key];
}
