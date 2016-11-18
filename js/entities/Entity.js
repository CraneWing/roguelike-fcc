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
			console.log('removing monster, and ' + player.totalMonsters +
			  ' are left!');
		}
		
		var i = entityGen.entities.indexOf(this);
		entityGen.entities.splice(i, 1);
	};
}

