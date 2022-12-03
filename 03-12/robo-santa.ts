import { readFileSync } from "fs";
import { resolve } from "path";

function main() {
  const line = readFileSync(resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  });

  const visited = new Set<string>();
  let x = 0,
    y = 0;
  visited.add(`${x},${y}`);

  for (let i = 0; i < line.length; i += 2) {
    const char = line.charAt(i);

    switch (char) {
      case ">":
        x++;
        break;
      case "<":
        x--;
        break;
      case "^":
        y++;
        break;
      case "v":
        y--;
        break;
    }
    visited.add(`${x},${y}`);
  }

  (x = 0), (y = 0);

  for (let i = 1; i < line.length; i += 2) {
    const char = line.charAt(i);

    switch (char) {
      case ">":
        x++;
        break;
      case "<":
        x--;
        break;
      case "^":
        y++;
        break;
      case "v":
        y--;
        break;
    }
    visited.add(`${x},${y}`);
  }

  console.log(line);
  console.log("visited at least", visited.size);
}

main();
