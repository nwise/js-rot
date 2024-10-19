export interface Action { }

export class MovementAction implements Action {
  distanceX: number;
  distanceY: number;

  constructor(distanceX: number, distanceY: number) {
    this.distanceX = distanceX;
    this.distanceY = distanceY;
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
