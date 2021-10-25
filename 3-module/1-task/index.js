function namify(users) {
  if (!Array.isArray(users)) {
    throw new SyntaxError('Argument must be an Array');
  }

  const names = [];

  users.forEach(user => {
    if (user.name) {
      names.push(user.name);
    }
  });

  return names;
}
