'use strict';

function truncate(str, maxlength) {
  if (!str) {
    return false;
  }

  return (str.length > maxlength) ? str.slice(0, maxlength - 1) + '…' : str;
}
