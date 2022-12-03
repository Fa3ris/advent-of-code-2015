import { resolve } from "path";
import { Reader } from "../helper/reader";

const dimensionRegex = /(\d+)x(\d+)x(\d+)/;

function main() {
  const reader = new Reader(resolve(__dirname, "input.txt"));

  let totalRibbon = 0;
  reader.addLineListener((line) => {
    const res = dimensionRegex.exec(line);

    if (res) {
      const [_, x, y, z, ...rest] = res;

      const [l, w, h] = [Number(x), Number(y), Number(z)];

      const lw = 2 * (l + w);
      const wh = 2 * (w + h);
      const hl = 2 * (h + l);

      let minPerimeter = Math.min(lw, wh);
      minPerimeter = Math.min(minPerimeter, hl);

      const ribbon = l * w * h + minPerimeter;
      console.log(line, { l, w, h, area: ribbon });

      totalRibbon += ribbon;
    }
  });
  reader.addCloseListener(() => {
    console.log("total ribbon", totalRibbon);
  });
  reader.run();
}

main();
