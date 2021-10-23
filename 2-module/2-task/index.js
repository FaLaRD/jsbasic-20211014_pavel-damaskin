function isEmpty(obj) {
  if (typeof obj !== 'object' && obj === null) {
    throw new SyntaxError('Argument must be an object');
  }

  for (let prop in obj) {
    return false;
  }

  return true;
}
