const spreadSheetContainer = document.querySelector('#spreadsheet-container');
const exportBtn = document.querySelector('#export-btn');
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

//문자열이 아닌 객체 데이터로 생성하기
class Cell {
  constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}
console.log(spreadsheet);

exportBtn.onclick = function (e) {
  let csv = '';
  for (let i = 0; i < spreadsheet.length; i++) {
    if (i === 0) continue;
    csv +=
      spreadsheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(',') + '\r\n';
  }
  const csvObj = new Blob([csv]);
  const csvUrl = URL.createObjectURL(csvObj);
  console.log('csv', csvUrl);
  const a = document.createElement('a');
  a.href = csvUrl;
  a.download = 'Spreadsheet File Name.csv';
  a.click(); // 강제 클릭시키기
};

//데이터를 생성 해주기
function initSpreadsheet() {
  for (let i = 0; i < ROWS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = '';
      let isHeader = false;
      let disabled = false;
      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      if (i === 0) {
        cellData = alphabets[j - 1];
        isHeader = true;
        disabled = true;
      }
      if (!cellData) {
        cellData = '';
      }
      const rowName = i;
      const columnName = alphabets[j - 1];

      const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
}
initSpreadsheet();

//데이터를 담을 요소 생성하기
function createCellElement(cell) {
  const cellEL = document.createElement('input');
  cell.className = 'cell';
  cell.id = `cell_${cell.row}${cell.column}`;
  cellEL.value = cell.data;
  cellEL.disabled = cell.disabled;
  if (cell.isHeader) {
    cellEL.classList.add('header');
  }

  cellEL.onclick = () => handleCellClick(cell);
  cellEL.onchange = (e) => handleOnChange(e.target.value, cell);
  return cellEL;
}

function handleOnChange(data, cell) {
  cell.data = data;
}

function handleCellClick(cell) {
  clearHeaderActiveStatus();
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];

  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);

  if (columnHeaderEl) {
    columnHeaderEl.classList.add('active');
  }

  if (rowHeaderEl) {
    rowHeaderEl.classList.add('active');
  }
}

function getElFromRowCol(row, col) {
  return document.querySelector('#cell_' + row + col);
}

function clearHeaderActiveStatus() {
  const headers = document.querySelectorAll('.header');

  headers.forEach((header) => {
    header.classList.remove('active');
  });
}

function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement('div');
    rowContainerEl.className = 'cell-row';
    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(createCellElement(cell));
    }
    spreadSheetContainer.append(rowContainerEl);
  }
}
