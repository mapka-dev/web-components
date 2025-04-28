export function trimCode(numSpaces: number, code: string) {
  return code
    .split("\n")
    .map((line) => line.slice(numSpaces))
    .join("\n");
}
