import { Engine } from './engine';
import { Entity } from './entity';

export interface Action {
  perform: (engine: Engine, entity: Entity) => void;
}

export abstract class ActionWithDirection implements Action {
  constructor(public distanceX: number, public distanceY: number) { }

  perform(_engine: Engine, _entity: Entity) { }
}

export class MovementAction extends ActionWithDirection {
  perform(engine: Engine, entity: Entity) {
    const destX = entity.x + this.distanceX;
    const destY = entity.y + this.distanceY;

    if (!engine.gameMap.isInBounds(destX, destY)) return;
    if (!engine.gameMap.tiles[destY][destX].walkable) return;
    if (engine.gameMap.getBlockingEntityAtLocation(destX, destY)) return;
    entity.move(this.distanceX, this.distanceY);
  }
}

export class MeleeAction extends ActionWithDirection {
  perform(engine: Engine, entity: Entity) {
    const destX = entity.x + this.distanceX;
    const destY = entity.y + this.distanceY;

    const target = engine.gameMap.getBlockingEntityAtLocation(destX, destY);

    if (!target) return;

    console.log(`You kick the ${target.name}, much to their annoyance!`);
  }
}

export class BumpAction extends ActionWithDirection {
  perform(engine: Engine, entity: Entity) {
    const destX = entity.x + this.distanceX;
    const destY = entity.y + this.distanceY;

    if (engine.gameMap.getBlockingEntityAtLocation(destX, destY)) {
      return new MeleeAction(this.distanceX, this.distanceY).perform(engine, entity);
    } else {
      return new MovementAction(this.distanceX, this.distanceY).perform(engine, entity);
    }
  }
}


interface MovementMap {
  [key: string]: Action;
}

const MOVE_KEYS: MovementMap = {
  ArrowUp: new BumpAction(0, -1),
  ArrowDown: new BumpAction(0, 1),
  ArrowLeft: new BumpAction(-1, 0),
  ArrowRight: new BumpAction(1, 0)
};

export function handleInput(event: KeyboardEvent): Action {
  return MOVE_KEYS[event.key];
}
