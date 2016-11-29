function Glen(x, y, w, h) {
	// top left corner coords
	this.topLX = x;
	this.topLY = y;
	// glen height and width
	this.h = h;
	this.w = w;

	this.bottRX = this.topLX + this.w;
	this.bottRY = this.topLY + this.h;

	this.midX = Math.floor((this.topLX + this.bottRX)/2);
	this.midY = Math.floor((this.topLY + this.bottRY)/2);
	
  // glen collision detection/overlap check
  this.intersects = function(glen) {
	  return (this.topLX <= glen.bottRX && this.bottRX >= glen.topLX &&
			this.topLY <= glen.bottRY && this.bottRY >= glen.topLY);
	};

	// adds glen to board map and transforms 
	// corresponding tiles to grass
	this.addGlenToBoard = function() {
		// select random grass sprite and fill in the glen
		var grType = 'gr' + getRandom(1, 2).toString();

		for (var x = this.topLX; x < this.bottRX; x++) {
			for (var y = this.topLY; y < this.bottRY; y++) {
				var t = board.board[x][y];				
				
				t.img = sprites.grass[grType].img;
				t.x = sprites.grass[grType].x;
				t.y = sprites.grass[grType].y;
				t.type = 'glen';
			}
		}
	};
}