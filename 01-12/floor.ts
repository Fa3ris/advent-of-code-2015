import { readFileSync } from "fs";
import { resolve } from "path";
import { Reader } from "../helper/reader";

function main() {
  console.log("coucou");

  const line = readFileSync(resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  });
  let floor = 0;
  for (let char of line) {
    if (char === "(") {
      floor++;
    } else {
      floor--;
    }
  }

  console.log(line);
  console.log("floor =", floor);
}

main();
