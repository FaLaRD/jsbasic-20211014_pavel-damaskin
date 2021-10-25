function sumSalary(salaries) {
  if (typeof salaries !== 'object' && salaries === null) {
    throw new SyntaxError('Argument must be an object');
  }

  let result = 0;

  for (let salary in salaries) {
    if (salaries.hasOwnProperty(salary)) {
      const value = salaries[salary];

      if (isFinite(value)) {
        result += value;
      }
    }
  }

  return result;
}
