export type Position = { x: 0 | 1; y: 0 | 1 };
export type MoveResult = { position: Position; message: string; visitedKitchen: boolean };

export function isLampRoom(position: Position): boolean {
  return position.x === 0 && position.y === 0;
}

export function moveToRoom(position: Position, target: Position, visitedKitchen: boolean): MoveResult {
  if (target.x === 0 && target.y === 0 && !visitedKitchen) return { position, message: "The lamp room door is locked.", visitedKitchen };
  const enteredKitchen = target.x === 0 && target.y === 1;
  return { position: target, message: `You enter the room.`, visitedKitchen: visitedKitchen || enteredKitchen };
}

export function movePlayer(position: Position, key: string, visitedKitchen: boolean): MoveResult {
  const moves: Record<string, { direction: string; dx: -1 | 0 | 1; dy: -1 | 0 | 1 }> = {
    ArrowUp: { direction: "north", dx: 0, dy: -1 }, ArrowRight: { direction: "east", dx: 1, dy: 0 },
    ArrowDown: { direction: "south", dx: 0, dy: 1 }, ArrowLeft: { direction: "west", dx: -1, dy: 0 },
  };
  const move = moves[key];
  if (!move) return { position, message: "", visitedKitchen };
  if (position.x === 1 && position.y === 1 && key === "ArrowUp" && !visitedKitchen) return { position, message: "The lamp room door is locked.", visitedKitchen };
  const nextX = position.x + move.dx; const nextY = position.y + move.dy;
  if (nextX < 0 || nextX > 1 || nextY < 0 || nextY > 1) return { position, message: `You cannot go ${move.direction}; the sea and cliff face block the way.`, visitedKitchen };
  const nextPosition = { x: nextX as 0 | 1, y: nextY as 0 | 1 };
  return { position: nextPosition, message: `You head ${move.direction}.`, visitedKitchen: visitedKitchen || (nextPosition.x === 0 && nextPosition.y === 1) };
}
