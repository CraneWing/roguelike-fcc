function Tile(img, sourceX, sourceY, drawX, drawY, type) {
	this.img = img;
	this.sourceX = sourceX;
	this.sourceY = sourceY;
	this.w = display.TILE_SIZE;
	this.h = display.TILE_SIZE;
	this.drawX = drawX;
	this.drawY = drawY;
	this.type = type;
	this.occupied = false;
	this.entNum = null;
	this.entType = null;
}