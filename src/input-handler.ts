import { Entity, Actor } from './entity';

export interface Action {
  perform: (entity: Entity) => void;
}

export class WaitAction implements Action {
  perform(_entity: Entity) { }
}

export abstract class ActionWithDirection implements Action {
  constructor(public distanceX: number, public distanceY: number) { }

  perform(_entity: Entity) { }
}

export class MovementAction extends ActionWithDirection {
  perform(entity: Entity) {
    const destX = entity.x + this.distanceX;
    const destY = entity.y + this.distanceY;

    if (!window.engine.gameMap.isInBounds(destX, destY)) return;
    if (!window.engine.gameMap.tiles[destY][destX].walkable) return;
    if (window.engine.gameMap.getBlockingEntityAtLocation(destX, destY)) return;
    entity.move(this.distanceX, this.distanceY);
  }
}

export class MeleeAction extends ActionWithDirection {
  perform(actor: Actor) {
    const destX = actor.x + this.distanceX;
    const destY = actor.y + this.distanceY;

    const target = window.engine.gameMap.getActorAtLocation(destX, destY);

    if (!target) return;

    const damage = actor.fighter.power - target.fighter.defense
    const attackDescription = `${actor.name.toUpperCase()} attacks ${target.name}`;

    if (damage > 0) {
      console.log(`${attackDescription} for ${damage} hit points`);
      target.fighter.hp -= damage;
    } else {
      console.log(`${attackDescription} but it has no effect`);
    }

  }
}

export class BumpAction extends ActionWithDirection {
  perform(entity: Entity) {
    const destX = entity.x + this.distanceX;
    const destY = entity.y + this.distanceY;

    if (window.engine.gameMap.getActorAtLocation(destX, destY)) {
      return new MeleeAction(this.distanceX, this.distanceY).perform(entity as Actor);
    } else {
      return new MovementAction(this.distanceX, this.distanceY).perform(entity as Actor);
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
  ArrowRight: new BumpAction(1, 0),
  Home: new BumpAction(-1, -1),
  End: new BumpAction(-1, 1),
  PageUp: new BumpAction(1, -1),
  PageDown: new BumpAction(1, 1),
  // Numpad Keys
  1: new BumpAction(-1, 1),
  2: new BumpAction(0, 1),
  3: new BumpAction(1, 1),

  4: new BumpAction(-1, 0),
  6: new BumpAction(1, 0),
  7: new BumpAction(-1, -1),
  8: new BumpAction(0, -1),
  9: new BumpAction(1, -1),
  // Vi keys
  h: new BumpAction(-1, 0),
  j: new BumpAction(0, 1),
  k: new BumpAction(0, -1),
  l: new BumpAction(1, 0),
  y: new BumpAction(-1, -1),
  u: new BumpAction(1, -1),

  b: new BumpAction(-1, 1),
  n: new BumpAction(1, 1),
  // Wait keys
  5: new WaitAction(),
  Period: new WaitAction(),
};

export function handleInput(event: KeyboardEvent): Action {
  return MOVE_KEYS[event.key];
}
