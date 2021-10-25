function filterRange(arr, a, b) {
  if (!Array.isArray(arr)) return;

  arr = arr.filter((num) => num >= a && num <= b);

  return arr;
}
