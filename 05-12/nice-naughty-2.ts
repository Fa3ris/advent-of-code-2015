import { resolve } from "path";
import { Reader } from "../helper/reader";

function pairTwice(s: string): boolean {
  let res = false;

  for (let i = 0; i < s.length - 1; i++) {
    const pair = s.substring(i, i + 2);
    const rest = s.substring(i + 2);
    if (rest.includes(pair)) {
      res = true;
      break;
    }
  }

  console.log("\x1b[32m%s\x1b[0m", s, res);
  return res;
}

function repeatWithOneLetterBetween(s: string): boolean {
  let res = false;

  for (let i = 1; i < s.length - 1; i++) {
    const prev = s.charAt(i - 1);
    const next = s.charAt(i + 1);

    if (prev === next) {
      res = true;
      break;
    }
  }

  console.log("\x1b[32m%s\x1b[0m", s, res);
  return res;
}

function test() {
  pairTwice("xyxy");
  pairTwice("aabcdefgaa");
  pairTwice("aaa");

  repeatWithOneLetterBetween("xyx");
  repeatWithOneLetterBetween("abcdefeghi");
  repeatWithOneLetterBetween("aaa");

  isNice("qjhvhtzxzqqjkmpb");
  isNice("xxyxx");
  isNice("uurcxstgmygtbstg");
  isNice("ieodomkazucvgmuy");
}

function isNice(s: string): boolean {
  const res = pairTwice(s) && repeatWithOneLetterBetween(s);
  console.log("\x1b[36m%s", s, "is nice", "\x1b[0m", res);
  return res;
}

// test();

function main() {
  const r = new Reader(resolve(__dirname, "input.txt"));
  let totalNice = 0;
  r.addLineListener((line) => {
    if (isNice(line)) {
      totalNice++;
    }
  });

  r.addCloseListener(() => {
    console.log("total nice", totalNice);
  });

  r.run();
}

main();
