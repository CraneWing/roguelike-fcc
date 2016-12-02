// helper function using lodash method equivalent
// to Math.foor(Math.random () * (max - min _ 1)) + min;
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// returns tile object, tile 2D array indexes or both
function getTileOrIndexes(boardX, boardY, type) {
  var col = Math.round(boardX/display.TILE_SIZE);
  var row = Math.round(boardY/display.TILE_SIZE);

  if (type === 'tile') {
    return (board.board[col][row]);
  }
  else if (type === 'indexes') {
    return [col, row];
  }
  else {
    return undefined;
  }
}