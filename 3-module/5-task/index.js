function getMinMax(str) {
  const res = {};

  const filteredNumbers = str.split(' ').filter(item => isFinite(item));

  const min = Math.min(...filteredNumbers);
  const max = Math.max(...filteredNumbers);

  res.min = min;
  res.max = max;

  return res;
}
