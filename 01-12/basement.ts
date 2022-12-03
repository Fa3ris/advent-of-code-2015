import { readFileSync } from "fs";
import { resolve } from "path";

function main() {
  const line = readFileSync(resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  });
  let floor = 0;
  let pos = 0;
  for (let char of line) {
    pos++;
    if (char === "(") {
      floor++;
    } else {
      floor--;
    }

    if (floor == -1) {
      break;
    }
  }

  console.log(line);
  console.log("basement =", floor, "at pos", pos);
}

main();
