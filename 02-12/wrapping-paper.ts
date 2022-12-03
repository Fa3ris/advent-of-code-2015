import { resolve } from "path";
import { Reader } from "../helper/reader";

const dimensionRegex = /(\d+)x(\d+)x(\d+)/;

function main() {
  const reader = new Reader(resolve(__dirname, "input.txt"));

  let totalArea = 0;
  reader.addLineListener((line) => {
    const res = dimensionRegex.exec(line);

    if (res) {
      const [_, x, y, z, ...rest] = res;

      const [l, w, h] = [Number(x), Number(y), Number(z)];

      const lw = l * w;
      const wh = w * h;
      const hl = h * l;

      let min = Math.min(lw, wh);
      min = Math.min(min, hl);

      const area = 2 * (lw + wh + hl) + min;
      console.log(line, { l, w, h, area });

      totalArea += area;
    }
  });
  reader.addCloseListener(() => {
    console.log("total area", totalArea);
  });
  reader.run();
}

main();
