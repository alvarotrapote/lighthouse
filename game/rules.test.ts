import assert from "node:assert/strict";
import test from "node:test";
import { isLampRoom, movePlayer, moveToRoom } from "./rules.ts";

test("the Lamp Room stays locked until the Keeper's Kitchen is visited", () => {
  const rocks = { x: 1 as const, y: 1 as const };
  const locked = movePlayer(rocks, "ArrowUp", false);
  assert.deepEqual(locked.position, rocks);
  assert.equal(locked.message, "The lamp room door is locked.");

  const kitchen = movePlayer(rocks, "ArrowLeft", false);
  const lampRoom = movePlayer(kitchen.position, "ArrowUp", kitchen.visitedKitchen);
  assert.deepEqual(lampRoom.position, { x: 0, y: 0 });
});

test("direction labels map to the same movement rules as arrow keys", () => {
  const rocks = { x: 1 as const, y: 1 as const };
  const kitchen = movePlayer(rocks, "ArrowLeft", false);
  assert.deepEqual(kitchen.position, { x: 0, y: 1 });
  const lampRoom = movePlayer(kitchen.position, "ArrowUp", kitchen.visitedKitchen);
  assert.deepEqual(lampRoom.position, { x: 0, y: 0 });
});

test("room buttons navigate directly while respecting the locked Lamp Room", () => {
  const rocks = { x: 1 as const, y: 1 as const };
  const locked = moveToRoom(rocks, { x: 0, y: 0 }, false);
  assert.deepEqual(locked.position, rocks);
  const kitchen = moveToRoom(rocks, { x: 0, y: 1 }, false);
  const lampRoom = moveToRoom(kitchen.position, { x: 0, y: 0 }, kitchen.visitedKitchen);
  assert.deepEqual(lampRoom.position, { x: 0, y: 0 });
});

test("only the Lamp Room receives the lamp effect", () => {
  assert.equal(isLampRoom({ x: 0, y: 0 }), true);
  assert.equal(isLampRoom({ x: 1, y: 1 }), false);
});
