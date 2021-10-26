function makeFriendsList(friends) {
  if (typeof friends !== 'object' && friends === null) {
    throw new SyntaxError('First argument must be an Object type');
  }

  const ul = document.createElement('ul');

  for (let friend in friends) {
    const li = document.createElement('li');
    const { firstName, lastName } = friends[friend];

    li.append(document.createTextNode(`${firstName} ${lastName}`));
    ul.append(li);
  }

  return ul;
}
