function makeDiagonalRed(table) {
  Array.from(table.rows).forEach((row, i) => {
    if (row.cells[i]) {
      row.cells[i].style.backgroundColor = 'red';
    }
  });
}
