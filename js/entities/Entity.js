function Entity(img, x, y, drawX, drawY, w, h, type) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.drawX = drawX;
	this.drawY = drawY;
	this.w = w;
	this.h = h;
	this.type = type;
	
	this.removeEntity = function() {
		// if entity is a monster, decrement total
		// monster amount on level
		if (this.type === 'monster') {
			player.totalMonsters--;
		}
		
		// remove entity object from entities array
		var i = entityGen.entities.indexOf(this);
		entityGen.entities.splice(i, 1);
	};
}

