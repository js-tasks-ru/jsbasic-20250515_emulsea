function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');

  for (const row of rows) {

    const cells = row.cells;
    const statusCell = cells[3];
    const genderCell = cells[2];
    const ageCell = cells[1];

    // 1. Обработка статуса (available/unavailable/hidden)
    if (statusCell.hasAttribute('data-available')) {
      const isAvailable = statusCell.dataset.available === 'true';
      row.classList.add(isAvailable ? 'available' : 'unavailable');
    } else {
      row.hidden = true;
    }

    // 2. Обработка пола (male/female)
    const gender = genderCell.textContent.trim();
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    // 3. Обработка возраста (зачеркивание если < 18)
    const age = parseInt(ageCell.textContent);
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
