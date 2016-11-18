function Tile(img, x, y, drawX, drawY, type) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = display.TILE_SIZE;
	this.h = display.TILE_SIZE;
	this.drawX = drawX;
	this.drawY = drawY;
	this.type = type;
	this.occupied = false;
	this.entNum = null;
	this.entType = null;
}