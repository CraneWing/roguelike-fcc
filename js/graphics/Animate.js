function Animate(sprite, frameSpeed) {
	this.sprite = sprite;
	this.frameSpeed = frameSpeed;
	this.fps = 20;

	this.frameSeq = [0, 1, 2, 3, 4, 5, 6, 7];
	this.frames = 0;

	this.currentFrame = 0;
	this.totalFrames = this.frameSeq.length - 1;
	this.count = 0;

	this.update = function(dt) {
		this.currentFrame = Math.floor(dt * this.fps/1000) % this.totalFrames;

		if (this.currentFrame === this.totalFrames) {
			this.currentFrame = 0;
		}		
	};

	this.render = function(ctx, drawX, drawY) {
		ctx.drawImage(
			this.sprite.img,
			this.frameSeq[this.currentFrame] * display.TILE_SIZE,
			this.sprite.sourceY,
			display.TILE_SIZE,
			display.TILE_SIZE,
			drawX, drawY, 32, 32
		);
	};
}