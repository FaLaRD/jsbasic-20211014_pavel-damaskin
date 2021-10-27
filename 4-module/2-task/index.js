function makeDiagonalRed(table) {
  if (table.tagName !== 'TABLE') {
    return;
  }

  const tRows = table.tBodies[0].rows;

  for (let row = 0; row < tRows.length; row++) {
    const tCells = tRows[row].cells;

    for (let cell = 0; cell < tCells.length; cell++) {
      tCells[row].style.backgroundColor = 'red';
      tCells[row].style.color = '#fff';
    }
  }
}
