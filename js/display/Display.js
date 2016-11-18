function Display() {
	this.TILE_SIZE = 32;
	this.WIDTH = this.TILE_SIZE * 26;
	this.HEIGHT = this.TILE_SIZE * 18;
	// set up game background canvas. this will be strictly
	// the forest background, which does not have to be redrawn 
	// every frame.
	this.bgCanvas = document.createElement('canvas');
	this.bgCanvas.setAttribute('id', 'bg-canvas');
	this.bgCanvas.width = this.WIDTH;
	this.bgCanvas.height = this.HEIGHT;
	this.bgCtx = this.bgCanvas.getContext('2d');
	// second canvas for player and entities. this one will be 
	// redrawn every frame.
	this.gameCanvas = document.createElement('canvas');
	this.gameCanvas.setAttribute('id', 'game-canvas');
	this.gameCanvas.width = this.WIDTH;
	this.gameCanvas.height = this.HEIGHT;
	this.gameCtx = this.gameCanvas.getContext('2d');
	
	var wrap = document.getElementById('canvas-wrap');
	wrap.appendChild(this.bgCanvas);
  wrap.appendChild(this.gameCanvas);
	
	this.clearAllCanvases = function() {
		this.bgCtx.clearRect(
			0, 0,
			this.bgCanvas.width,
			this.bgCanvas.height
		);
		
		this.gameCtx.clearRect(
			0, 0,
			this.gameCanvas.width,
			this.gameCanvas.height
		);
	};
	
	this.clearGame = function() {
		this.gameCtx.clearRect(
			0, 0,
			this.gameCanvas.width,
			this.gameCanvas.height
		);
	};
	
	// the next few functions will update stats
	// displayed in the header.
	this.updateXP = function(score) {
	  score = score.toString();
		var xDiv = document.getElementById('x-points');
		xDiv.innerHTML = score;
	};
	
	this.updateHealth = function(health) {
		if (health !== 'DEAD') {
			health = health.toString();
		}
		
		var healthDiv = document.getElementById('health');
		healthDiv.innerHTML = health;
	};
	
	this.updateTreasure = function(totalVal) {
		totalVal = totalVal.toString();
		var treasDiv = document.getElementById('treasure');
		treasDiv.innerHTML = totalVal;
	};
	
	this.updateDefeated = function(num) {
		num = num.toString();
		var defeatedDiv = document.getElementById('defeated');
		defeatedDiv.innerHTML = num;
	};
	
	this.updateWeapon = function(weapon) {
		var weaponDiv = document.getElementById('weapon');
		weaponDiv.innerHTML = weapon.name + ', damage ' + weapon.damage;
	};
	
	this.updateLevel = function(level) {
		var levelDiv = document.getElementById('level');
		levelDiv.innerHTML = level;
	};
	
	this.showMessage1 = function(msg) {
		var msgDiv1 = document.getElementById('message1');
		msgDiv1.innerHTML = msg;
	};
	
	this.showMessage2 = function(msg) {
		var msgDiv2 = document.getElementById('message2');
		msgDiv2.innerHTML = msg;
	};
	
	this.renderGrid = function() {
		for (var i = 32; i < this.canvas.width; i += 32) {
			this.ctx.beginPath();
	    this.ctx.moveTo(i, 0);
	    this.ctx.lineTo(i, display.canvas.height);
	    this.ctx.strokeStyle = '#000';
	  	this.ctx.stroke();
		}
		
		for (var i = 32; i < this.canvas.height; i += 32) {
			this.ctx.beginPath();
	  	this.ctx.moveTo(0, i);
	  	this.ctx.lineTo(this.canvas.width, i);
	  	this.ctx.strokeStyle = '#000';
			this.ctx.stroke();
		}
		
	};
}