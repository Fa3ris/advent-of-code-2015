import { resolve } from "path";
import { Reader } from "../helper/reader";

enum OP {
  ON,
  OFF,
  TOGGLE,
}

type Instruction = {
  op: OP;

  rowStart: number;
  colStart: number;

  rowEnd: number;
  colEnd: number;
};

function parse(s: string): Instruction {
  const re = /(.*) (\d+),(\d+).*?(\d+),(\d+)/;

  const arr = [...(re.exec(s) || [])];

  let op: OP;
  switch (arr[1]) {
    case "turn off":
      op = OP.OFF;
      break;
    case "turn on":
      op = OP.ON;
      break;
    case "toggle":
      op = OP.TOGGLE;
      break;
    default:
      throw "invalid op " + arr[1];
  }

  return {
    op,
    rowStart: Number(arr[2]),
    colStart: Number(arr[3]),
    rowEnd: Number(arr[4]),
    colEnd: Number(arr[5]),
  };
}

function getIndex(row: number, col: number): number {
  return row * 1e3 + col;
}

function main() {
  const r = new Reader(resolve(__dirname, "input.txt"));

  const grid: number[] = new Array(1e6).fill(0);
  r.addLineListener((line) => {
    const { op, rowStart, rowEnd, colStart, colEnd } = parse(line);

    for (let row = rowStart; row <= rowEnd; row++) {
      for (let col = colStart; col <= colEnd; col++) {
        const i = getIndex(row, col);
        switch (op) {
          case OP.OFF:
            grid[i] = Math.max(0, --grid[i]);
            break;
          case OP.ON:
            grid[i]++;
            break;
          case OP.TOGGLE:
            grid[i] += 2;
        }
      }
    }
  });

  r.addCloseListener(() => {
    const totalLit = grid.reduce((acc, val) => acc + val, 0);
    console.log("total brightness", totalLit);
  });

  r.run();
}

main();
