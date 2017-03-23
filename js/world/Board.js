// method for creating forest and glens based 
// in part on dungeon generation at Rogue Basin in 
// the series on writing a roguelike in Python,
// with some of that code ported to JS.
function Board() {
	this.board = []; // 2D array that will hold tile data
	this.glens = []; // array of glens to add to forest
	this.numGlens = getRandom(17, 22); // random glen quantity
	this.MIN_GLEN_SIZE = 2; // min glen width or height
	this.MAX_GLEN_SIZE = 4; // max glen width or height
	// board column and row numbers
	this.cols = Math.floor(display.bgCanvas.width/display.TILE_SIZE);
  this.rows = Math.floor(display.bgCanvas.height/display.TILE_SIZE);
  // boolean if board generation done or not
  this.boardReady = false;
	
	console.log('cols are ' + this.cols + ' and rows are ' + this.rows);
  // board initially starts as a 2D array filled
  // entirely with tree tiles.
  this.setUpBoard = function() {
  	for (var i = 0; i < this.cols; i++) {
  		this.board[i] = [];
			for (var j = 0; j < this.rows; j++) {
				// get 1 of 9 tree types
				var trType = 'tr' + getRandom(1, 9).toString();
				// default tree tile data includes tree image,
				// sprite sheet x and y coords on sprite sheet,
				// coords on canvas and tile type.
				this.board[i][j] = new Tile(
					sprites.trees[trType].img,
					sprites.trees[trType].sourceX,
					sprites.trees[trType].sourceY,
					i * display.TILE_SIZE,
					j * display.TILE_SIZE,
					'tree'
				);
			}
		}
	  // randomly generate glens for forest
		this.createGlenArray();
		
		// generate food, monsters, treasures
		// and weapon
		entityGen.createFood();
		entityGen.createMonsters();
		entityGen.createTreasures();
		entityGen.createWeapon();
		
		//console.log(entityGen.entities);
	
		// if on level 4, additionally generate a boss
		if (game.level === 4) {
			entityGen.createBoss();
		}
		
		// when all board and entity creation done, 
		// ready to start the game loop.
		this.boardReady = true;
  }; // setUpBoard

	this.createGlenArray = function() {
		var testGlen;
		var glenIntersects = false;
		var count = 0;

		while (count < this.numGlens) {
			// a random glen is created
    	testGlen = this.setUpGlen();
			// loop through glens array and check if a test
			// glen overlaps any other glens
			for (var j = 0; j < this.glens.length; j++) {
				var g = this.glens[j];

				glenIntersects = false;
				// if the glen overlaps any other glen, it is
				// "tossed out", and the process is repeated.
				if (testGlen.intersects(g)) {
					glenIntersects = true;
					break;
				}
			}

			if (!glenIntersects) {
				// a glen that does not overlap is then added
				// to the board array, with tree tiles changed 
				// to grass.
				testGlen.addGlenToBoard();
				// if this is the first glen, its approximate center
				// tile is calculated, and the player is positioned 
				// on that tile.
				if (count === 0) {
					player.boardX = testGlen.midX * display.TILE_SIZE;
					player.boardY = testGlen.midY * display.TILE_SIZE;
				 
					// tile data updated to show it is occupied by player
					this.board[testGlen.midX][testGlen.midY].occupied = true;
					this.board[testGlen.midX][testGlen.midY].entType = 'player';
				}
				else {
					var prev = this.glens[count - 1];
					// with second glen and to the end, testing done with
					// its midpoints and those of previous to create vertical
					// or horizontal path. 
					if (getRandom(0, 1) === 1) {
						this.makeHorizPath(prev.midX, testGlen.midX, prev.midY);
						this.makeVertPath(prev.midY, testGlen.midY, testGlen.midX);
					}
					else {
						this.makeVertPath(prev.midY, testGlen.midY, prev.midX);
						this.makeHorizPath(prev.midX, testGlen.midX, testGlen.midY);
					}								
				}
				// non-overlapping glen now added to glen array
				this.glens.push(testGlen);
				count++;
					
			} // if !overlaps
	 	} // for var i = 0
	}; // createGlenArray
	
	// make a glen that has random width and height and
	// random x, y position on the board.
	this.setUpGlen = function() {
	  // randomly set starting x and y coordinates
	  var w = getRandom(this.MIN_GLEN_SIZE, this.MAX_GLEN_SIZE);
	  var h = getRandom(this.MIN_GLEN_SIZE, this.MAX_GLEN_SIZE);
	   // randomly set glen height and width
	  var x = getRandom(0, this.cols - w - 1);
	  var y = getRandom(0, this.rows - h - 1);
	 
	  var glen = new Glen(x, y, w, h);
	  return glen;
	};
	
	// make horizontal path
	this.makeHorizPath = function(x1, x2, y) {
		// two grass sprites are available. randomly 
		// select one of them for the path tiles.
		var grType = 'gr' + getRandom(1, 2).toString();
		// update tiles in the path, changing them from tree
		// to path type.
		for (var i = Math.min(x1, x2); i <= Math.max(x1, x2) + 1; i++) {
			var t = this.board[i][y];

			t.img = sprites.grass[grType].img;
			t.sourceX = sprites.grass[grType].sourceX;
			t.sourceY = sprites.grass[grType].sourceY;
			t.type = 'path';
			t.occupied = false;
		}
	}; // makeHorizPath

	// vertical path methods virtually identical to 
	// horizontal.
	this.makeVertPath = function(y1, y2, x) {
		var grType = 'gr' + getRandom(1, 2).toString();

		for (var i = Math.min(y1, y2); i <= Math.max(y1, y2) + 1; i++) {
			var t = this.board[x][i];

			t.img = sprites.grass[grType].img;
			t.sourceX = sprites.grass[grType].sourceX;
			t.sourceY = sprites.grass[grType].sourceY;
			t.type = 'path';
			t.occupied = false;
		}
	}; // makeVertPath
	
	// this simply draws the board to the canvas
	this.render = function(bgCtx) {
		//console.log('number of glens random generation: ' + this.numGlens);
		//console.log('number glens in array: ' + this.glens.length);
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				var t = this.board[i][j];
	
				bgCtx.drawImage(
					t.img,
					t.sourceX, t.sourceY,
					display.TILE_SIZE,
					display.TILE_SIZE,
					t.drawX, t.drawY,
					t.w, t.h
				);
			}
		}
	}; // render
}