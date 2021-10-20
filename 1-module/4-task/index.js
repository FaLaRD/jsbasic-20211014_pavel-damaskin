'use strict';

function checkSpam(str) {
  if (!str) {
    return false;
  }

  str = str.toLowerCase();
  const conditional = str.includes('1xbet') || str.includes('xxx');

  return conditional;
}
