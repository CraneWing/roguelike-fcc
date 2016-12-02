function Viewport() {
	this.render = function(ctx) {
		// viewport will create a 7 x 7 tile square that 
		// centers the player and follows him 
		
		// get player column and row indexes
		var indexes = getTileOrIndexes(player.boardX, player.boardY, 'indexes');
		
		var colIndex = indexes[0];
		var rowIndex = indexes[1];
		// start and end of tile rows and columns to
		// draw in the viewport
		var colBegin, colEnd, rowBegin, rowEnd;
		
		// each check of row and column start checks
		// if player is 3 or 21 tiles from edge. If so, 
		// start and end are set to keep viewport size
		// consistent.
		if (colIndex <= 3) {
			colBegin = 0;
			colEnd = 6;
		}
		else {
			colBegin = colIndex - 3;
		}
		
		if (colIndex >= 21) {
			colBegin = 19;
			colEnd = 25;
		}
		else {
			colEnd = colIndex + 3;
		}
		
		if (rowIndex <= 3) {
			rowBegin = 0;
			rowEnd = 6;
		}
		else {
			rowBegin = rowIndex - 3;
		}
		
		if (rowIndex >= 21) {
			rowBegin = 19;
			rowEnd = 25;
		}
		else {
			rowEnd = rowIndex + 3;
		}
		
		// loop through rows and columns to draw viewport 
		for (var i = colBegin; i <= colEnd; i++) {
			for (var j = rowBegin; j <= rowEnd; j++) {
				//console.log('i is ' + i + ' and j is ' + j);
				var tile = board.board[i][j];
				
				ctx.drawImage(
					tile.img,
					tile.sourceX,
					tile.sourceY,
					display.TILE_SIZE,
					display.TILE_SIZE,
					tile.drawX,
					tile.drawY,
					display.TILE_SIZE,
					display.TILE_SIZE
				);
				
				// if tile has entity on it (tile "occupied"
				// property true), then find entity number, 
				// draw to tile and break out of loop.
				if (tile.occupied === true) {
					for (var k = 0; k < entityGen.entities.length; k++) {
						if (entityGen.entities[k].entNum === tile.entNum) {
							var e =	entityGen.entities[k];
							
							ctx.drawImage(
								e.img,
								e.sourceX, e.sourceY,
								display.TILE_SIZE,
								display.TILE_SIZE,
								e.drawX,
								e.drawY,
								display.TILE_SIZE,
								display.TILE_SIZE
							);
							
							break;
						}
					}
				}
			}
		}
	};
}