function highlight(table) {
  if (table.tagName !== 'TABLE') {
    return;
  }

  const tRows = table.tBodies[0].rows;

  for (let row = 0; row < tRows.length; row++) {
    const currentRow = tRows[row];

    // process availability
    const isAvailable = currentRow.querySelector('td[data-available="true"]');
    const isUnavailable = currentRow.querySelector('td[data-available="false"]');

    if (isAvailable) {
      currentRow.classList.add('available');
    } else if (isUnavailable) {
      currentRow.classList.add('unavailable');
    } else {
      currentRow.hidden = true;
    }

    // process age
    const isYoung = parseInt(currentRow.cells[1].textContent) < 18;

    if (isYoung) {
      currentRow.style.cssText = 'text-decoration: line-through';
    }

    // process gender
    const isMale = currentRow.cells[2].textContent === 'm';
    const isFemale = currentRow.cells[2].textContent === 'f';

    if (isMale) {
      currentRow.classList.add('male');
    } else if (isFemale) {
      currentRow.classList.add('female');
    }
  }
}
