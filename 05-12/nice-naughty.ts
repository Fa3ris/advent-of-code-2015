import { resolve } from "path";
import { Reader } from "../helper/reader";

function isNice(s: string): boolean {
  const vowel = /[aeiuo]/g;
  const vowelsMatches = [...s.matchAll(vowel)];
  const vowelsOK = vowelsMatches.length >= 3;

  const doubledLetter = /(\w)\1/;
  const hasDoubledLetter = doubledLetter.test(s);

  const toExclude = [/ab/, /cd/, /pq/, /xy/];
  const hasNoForbidden = !toExclude.some((regex) => regex.test(s));

  const res = vowelsOK && hasDoubledLetter && hasNoForbidden;
  console.log(`${s} ${res ? "nice" : "naughty"}`);
  return res;
}

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
