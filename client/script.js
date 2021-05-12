let difficulty = 'easy';
let started = false;
let NYTPuzzles;
let puzzle = [];

const buttonClick = (inputDifficulty) => {
  difficulty = inputDifficulty;
  let buttons = document.querySelectorAll('.difficulty_button');
  buttons.forEach((button) => {
    button.classList.remove('selected');
  });
  document.querySelector(`#${difficulty}`).classList.add('selected');
};

const getPuzzles = () => {
  document.querySelector('.loading').style.display = 'block';
  return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.loading').style.display = 'none';
      return data;
    });
};

const timeout = (length) => {
  return new Promise((resolve) => setTimeout(resolve, length));
};

const clearGUI = () => {
  console.log('clearing the board..');
  document.querySelector('#board').remove();
  document.querySelector('.success').style.display = 'none';
  puzzle = [];
};

const createGUI = () => {
  let boardContainer = document.getElementById('board_container');
  let board = document.createElement('div');
  board.id = 'board';
  boardContainer.appendChild(board);
  for (let i = 0; i < 9; i += 1) {
    let row = document.createElement('section');
    row.className = 'row';
    row.id = i;
    board.appendChild(row);
    for (let j = 0; j < 9; j += 1) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `${i}-${j}`;
      row.appendChild(cell);
    }
  }
};

const updateGUI = (board) => {
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell != 0)
        document.getElementById(`${rowIndex}-${cellIndex}`).innerHTML = cell;
    });
  });
};

function nextEmptySpot(board) {
  for (var row = 0; row < 9; row += 1) {
    for (var col = 0; col < 9; col += 1) {
      if (board[row][col] === 0) return [row, col];
    }
  }
  return [-1, -1];
}

const evaluateSubGrid = (board, rowIndex, columnIndex, guess) => {
  const xBounds = Math.floor(columnIndex / 3) * 3;
  const yBounds = Math.floor(rowIndex / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[yBounds + i][xBounds + j] === guess) {
        return false;
      }
    }
  }
  return true;
};

const evaluateLine = (board, rowIndex, columnIndex, guess) => {
  for (let pointer = 0; pointer < 9; pointer += 1) {
    if (
      board[rowIndex][pointer] === guess ||
      board[pointer][columnIndex] === guess
    ) {
      return false;
    }
  }
  return true;
};

const solve = async (board, selectedTimeout) => {
  let [row, col] = nextEmptySpot(board);
  if (row === -1) {
    return board;
  }
  for (let guess = 1; guess <= 9; guess += 1) {
    if (
      evaluateLine(board, row, col, guess) &&
      evaluateSubGrid(board, row, col, guess)
    ) {
      board[row][col] = guess;
      await timeout(selectedTimeout).then(() => updateGUI(board));
      await solve(board, selectedTimeout);
    }
  }
  if (nextEmptySpot(board)[0] !== -1) {
    board[row][col] = 0;
  }

  return board;
};

const start = async () => {
  if (started) clearGUI();
  await timeout(500);
  started = true;
  let selectedTimeout = document.querySelector('#timeout').value;
  if (!NYTPuzzles) NYTPuzzles = await getPuzzles();
  let rawPuzzle = NYTPuzzles[`${difficulty}`].puzzle_data.puzzle;
  for (let i = 0; i <= 72; i += 9) {
    puzzle.push(rawPuzzle.slice(i, i + 9));
  }
  await createGUI();
  updateGUI(puzzle);
  await solve(puzzle, selectedTimeout);
  document.querySelector('.success').style.display = 'block';
};
