function showSalary(users, age) {
  if (!Array.isArray(users)) {
    throw new SyntaxError('Argument must be an Array');
  }

  let res = '';

  const filteredUsers = users.filter(user => age >= user.age);

  filteredUsers.forEach((user, ix) => {
    const lineBreak = (filteredUsers.length - 1 === ix) ? '' : '\n';

    res += `${user.name}, ${user.balance}${lineBreak}`;
  });

  return res;
}
