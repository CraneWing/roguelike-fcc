// helper function using lodash method equivalent
// to Math.foor(Math.random () * (max - min _ 1)) + min;
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// simple bounding box collision detection
function checkCollision(player, tile) {
  if (player.drawX <= tile.drawX + tile.w && 
    player.drawX + player.w >= tile.drawX &&
    player.drawY <= tile.drawY + tile.h &&
    player.y + player.h >= tile.drawY) {
      
      return true;
  }
  
  return false;
}