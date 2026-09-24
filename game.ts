type Direction = "north" | "south" | "east" | "west";

type Room = {
  name: string;
  image: string;
  description: string;
};

type Position = {
  x: number;
  y: number;
};

const rooms: Room[][] = [
  [
    {
      name: "Spiral Stair",
      image: "assets/rooms/spiral-stair.png",
      description:
        "An iron stair coils upward through the cold stone tower. Salt wind whistles through a narrow slit in the wall.",
    },
    {
      name: "Lamp Room",
      image: "assets/rooms/lamp-room.png",
      description:
        "A great glass lens turns slowly above the dark sea. Its warm beam sweeps across the waves and vanishes into the fog.",
    },
  ],
  [
    {
      name: "Keeper's Kitchen",
      image: "assets/rooms/keepers-kitchen.png",
      description:
        "A black kettle rests beside the ashes of a small stove. The table is laid for one, but the keeper is nowhere to be seen.",
    },
    {
      name: "Rocks",
      image: "assets/rooms/rocks.png",
      description:
        "Black rocks shine beneath the lighthouse as waves burst into white spray. A weathered door stands open to the west.",
    },
  ],
];

const moves: Record<Direction, Position> = {
  north: { x: 0, y: -1 },
  south: { x: 0, y: 1 },
  east: { x: 1, y: 0 },
  west: { x: -1, y: 0 },
};

const keyDirections: Record<string, Direction> = {
  ArrowUp: "north",
  ArrowDown: "south",
  ArrowRight: "east",
  ArrowLeft: "west",
};

let player: Position = { x: 1, y: 1 };

const roomName = document.querySelector<HTMLElement>("#room-name")!;
const roomImage = document.querySelector<HTMLImageElement>("#room-image")!;
const description = document.querySelector<HTMLElement>("#description")!;
const exits = document.querySelector<HTMLElement>("#exits")!;
const message = document.querySelector<HTMLElement>("#message")!;
const mapRooms = document.querySelectorAll<HTMLElement>(".map-room");

function isInsideGrid(position: Position): boolean {
  return position.x >= 0 && position.x < 2 && position.y >= 0 && position.y < 2;
}

function availableDirections(): Direction[] {
  return (Object.keys(moves) as Direction[]).filter((direction) => {
    const move = moves[direction];
    return isInsideGrid({ x: player.x + move.x, y: player.y + move.y });
  });
}

function render(): void {
  const room = rooms[player.y][player.x];
  roomName.textContent = room.name;
  roomImage.src = room.image;
  roomImage.alt = `View of the ${room.name}`;
  description.textContent = room.description;
  exits.textContent = availableDirections().join(" and ");
  mapRooms.forEach((mapRoom) => {
    const isCurrent = Number(mapRoom.dataset.x) === player.x && Number(mapRoom.dataset.y) === player.y;
    mapRoom.classList.toggle("current", isCurrent);
    if (isCurrent) mapRoom.setAttribute("aria-current", "location");
    else mapRoom.removeAttribute("aria-current");
  });
}

function move(direction: Direction): void {
  const offset = moves[direction];
  const destination = { x: player.x + offset.x, y: player.y + offset.y };

  if (!isInsideGrid(destination)) {
    message.textContent = `You cannot go ${direction}; the stormy sea blocks the way.`;
    return;
  }

  player = destination;
  message.textContent = "";
  render();
}

document.addEventListener("keydown", (event) => {
  const direction = keyDirections[event.key];
  if (!direction) return;

  event.preventDefault();
  move(direction);
});

render();
