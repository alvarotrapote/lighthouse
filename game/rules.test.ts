import assert from "node:assert/strict";
import test from "node:test";
import { movePlayer } from "./rules.ts";

test("the Lamp Room stays locked until the Keeper's Kitchen is visited", () => {
  const rocks = { x: 1 as const, y: 1 as const };
  const locked = movePlayer(rocks, "ArrowUp", false);
  assert.deepEqual(locked.position, rocks);
  assert.equal(locked.message, "The lamp room door is locked.");

  const kitchen = movePlayer(rocks, "ArrowLeft", false);
  const lampRoom = movePlayer(kitchen.position, "ArrowUp", kitchen.visitedKitchen);
  assert.deepEqual(lampRoom.position, { x: 0, y: 0 });
});
