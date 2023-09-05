class Spreadsheet {
  constructor(tableSize, tableId) {
    this.tableSize = tableSize;
    this.table = document.getElementById(tableId);
    this.tbody = this.table.querySelector('tbody');
    this.thead = this.table.querySelector('thead tr');
    this.rowletters = 'ABCDEFGHI';
  }

  createHeader() {
    let headerHTML = '<th></th>';
    for (let i = 0; i < this.tableSize.columns; i++) {
      headerHTML += `<th>${this.rowletters[i]}</th>`;
    }
    this.table.querySelector('thead tr').innerHTML = headerHTML;
  }

  createBody() {
    let bodyHTML = '';
    for (let i = 0; i < this.tableSize.rows; i++) {
      bodyHTML += `<tr><td>${i + 1}</td>`;
      for (let j = 0; j < this.tableSize.columns; j++) {
        bodyHTML += '<td><input type="text" class="cell-input"></td>';
      }
      bodyHTML += '</tr>';
    }
    this.table.querySelector('tbody').innerHTML = bodyHTML;
  }

  initNavigation() {
    const inputs = this.table.querySelectorAll('.cell-input');

    inputs.forEach((input) => {
      input.addEventListener('keydown', (event) => {
        switch (event.keyCode) {
          case 37: // 왼쪽 방향키
            this.navigate(input, -1, 0);
            break;
          case 38: // 위 방향키
            this.navigate(input, 0, -1);
            break;
          case 39: // 오른쪽 방향키
            this.navigate(input, 1, 0);
            break;
          case 40: // 아래 방향키
            this.navigate(input, 0, 1);
            break;
        }
      });
      input.addEventListener('focus', () => {
        this.updateFocusedCell(input);
      });
    });
  }

  updateFocusedCell(input) {
    this.table.querySelectorAll('.highlight').forEach((cell) => cell.classList.remove('highlight'));

    const cell = input.closest('td');
    const row = cell.closest('tr');
    const colIndex = Array.from(row.children).indexOf(cell);
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);

    const cellName = `${this.rowletters[colIndex - 1]}${rowIndex + 1}`;
    document.getElementById('cellFind').innerText = `Cell: ${cellName}`;

    this.highlightRowAndColumn(rowIndex, colIndex);
  }

  highlightRowAndColumn(rowIndex, colIndex) {
    console.log(this.tbody.children);
    console.log(this.tbody.children[rowIndex]);
    console.log(this.tbody.children[rowIndex].children);
    console.log(this.tbody.children[rowIndex].children[0]);

    this.table.querySelectorAll('.highlight').forEach((highlighted) => {
      highlighted.classList.remove('highlight');
    });

    const highlightedRowNumber = this.tbody.children[rowIndex].children[0];
    const highlightedColumnName = this.thead.children[colIndex];

    highlightedRowNumber.classList.add('highlight');
    highlightedColumnName.classList.add('highlight');
  }

  navigate(currentInput, dx, dy) {
    const currentCell = currentInput.closest('td');
    const currentRow = currentCell.closest('tr');
    let targetRow = currentRow;
    let targetCell;

    if (dy) {
      const rowIndex = Array.from(currentRow.parentElement.children).indexOf(currentRow) + dy;
      targetRow = currentRow.parentElement.children[rowIndex];
    }

    if (targetRow) {
      const cellIndex = Array.from(currentRow.children).indexOf(currentCell) + dx;
      targetCell = targetRow.children[cellIndex];
    }

    if (targetCell) {
      const targetInput = targetCell.querySelector('input');
      if (targetInput) {
        targetInput.focus();
      }
    }
  }

  prepareTableData() {
    const inputs = this.table.querySelectorAll('.cell-input');
    inputs.forEach((input) => {
      input.parentElement.textContent = input.value;
    });
  }

  exportToExcel() {
    this.prepareTableData();

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(this.table);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'spreadsheet.xlsx');
  }

  render() {
    this.createHeader();
    this.createBody();
    this.initNavigation();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const mySpreadsheet = new Spreadsheet({ rows: 9, columns: 9 }, 'table');
  mySpreadsheet.render();

  document.getElementById('exportExcel').addEventListener('click', function () {
    mySpreadsheet.exportToExcel();
  });
});
