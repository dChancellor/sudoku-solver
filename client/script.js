const getPuzzle = (difficulty) => {
  const url = `https://www.nytimes.com/puzzles/sudoku/${difficulty}`;
  $.getJSON(
    'http://www.whateverorigin.org/get?url=' +
      encodeURIComponent(url) +
      '&callback=?',
    function (data) {
      console.log(data);
      alert(data.contents);
    }
  );
  // const { data } = $.get(url);
};

getPuzzle('easy');

function possible(board, y, x, n) {
  for (let i = 0; i < 9; i++) {
    if (board[y][i] === n || board[i][x] === n) {
      return false;
    }
  }

  const xSquare = Math.floor(x / 3) * 3;
  const ySquare = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[ySquare + i][xSquare + j] === n) {
        return false;
      }
    }
  }

  return true;
}

function solve(board) {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (board[y][x] === 0) {
        for (let n = 1; n <= 9; n++) {
          if (possible(board, y, x, n)) {
            board[y][x] = n;

            if (solve(board)) return board;
          }
        }

        board[y][x] = 0;
        return false;
      }
    }
  }

  return board;
}

const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

//   console.log(solve(puzzle).map(e => "" + e));
