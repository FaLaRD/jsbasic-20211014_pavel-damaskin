'use strict';

function factorial(n) {
  if (typeof n !== 'number') {
    return;
  }

  let res = 1;

  for (let i = n; i > 1; i--) {
    res *= i;
  }

  return res;
}
