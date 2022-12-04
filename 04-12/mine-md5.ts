import { createHash } from "crypto";

console.log(computeMd5("abcdef609043"));
console.log(computeMd5("abcdef609043"));

function computeMd5(input: string) {
  const hash = createHash("md5");
  hash.update(input);
  return hash.digest("hex");
}

const secret = "bgvyzdsv";
// const secret = "abcdef";
// const secret = "pqrstuv";

let value = 0;

while (true) {
  const md5 = computeMd5(`${secret}${value}`);
  if (md5.startsWith("000000")) {
    break;
  }
  value++;
}

console.log(value);
