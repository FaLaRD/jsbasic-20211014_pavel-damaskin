/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    this.elem.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`;

    this.elem.append(this.renderTable(rows));
    this.setRemoveEvent();
  }

  renderTable(data) {
    if (!Array.isArray(data)) {
      return;
    }

    const tBody = document.createElement('tbody');

    data.forEach(person => {
      const tr = document.createElement('tr');

      const tdName = document.createElement('td');
      tdName.append(document.createTextNode(person.name));

      const tdAge = document.createElement('td');
      tdAge.append(document.createTextNode(person.age));

      const tdSalary = document.createElement('td');
      tdSalary.append(document.createTextNode(person.salary));

      const tdCity = document.createElement('td');
      tdCity.append(document.createTextNode(person.city));

      const tdRemove = document.createElement('td');
      tdRemove.innerHTML = `<button class="js-person-remove">X</button>`;

      tr.append(tdName);
      tr.append(tdAge);
      tr.append(tdSalary);
      tr.append(tdCity);
      tr.append(tdRemove);

      tBody.append(tr);
    });

    return tBody;
  }

  setRemoveEvent() {
    this.elem.addEventListener('click', (e) => {
      const removeButton = e.target.closest('.js-person-remove');

      if (!removeButton) {
        return;
      }

      const parentTr = removeButton.closest('tr');

      parentTr.remove();
    });
  }
}
