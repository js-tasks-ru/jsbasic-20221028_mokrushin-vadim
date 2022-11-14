function getMinMax(str) {
  const arr = str
    .split(" ")
    .filter((item) => isFinite(item))
    .map((item) => +item);
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
