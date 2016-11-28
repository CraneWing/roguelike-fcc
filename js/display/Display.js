function Display() {
	// canvas area constants
	this.TILE_SIZE = 32;
	this.WIDTH = this.TILE_SIZE * 26;
	this.HEIGHT = this.TILE_SIZE * 26;
	
	// game background canvas
	this.bgCanvas = document.createElement('canvas');
	this.bgCanvas.setAttribute('id', 'bg-canvas');
	this.bgCanvas.width = this.WIDTH;
	this.bgCanvas.height = this.HEIGHT;
	this.bgCtx = this.bgCanvas.getContext('2d');
	
	this.titleCanvas = document.createElement('canvas');
	this.titleCanvas.setAttribute('id', 'title-canvas');
	this.titleCanvas.width = this.WIDTH;
	this.titleCanvas.height = this.HEIGHT;
	this.titleCtx = this.titleCanvas.getContext('2d');
	
	// player canvas
	this.playerCanvas = document.createElement('canvas');
	this.playerCanvas.setAttribute('id', 'player-canvas');
	this.playerCanvas.width = this.WIDTH;
	this.playerCanvas.height = this.HEIGHT;
	this.playCtx = this.playerCanvas.getContext('2d');
	
	// viewport canvas
	this.viewCanvas = document.createElement('canvas');
	this.viewCanvas.setAttribute('id', 'view-canvas');
	this.viewCanvas.width = this.WIDTH;
	this.viewCanvas.height = this.HEIGHT;
	this.viewCtx = this.viewCanvas.getContext('2d');
	
	// canvas for entities (food, monsters, treasures, weapon)
	this.entityCanvas = document.createElement('canvas');
	this.entityCanvas.setAttribute('id', 'entity-canvas');
	this.entityCanvas.width = this.WIDTH;
	this.entityCanvas.height = this.HEIGHT;
	this.entityCtx = this.entityCanvas.getContext('2d');
	
	var wrap = document.getElementById('canvas-wrap');
	
	wrap.appendChild(this.bgCanvas);
	wrap.appendChild(this.entityCanvas);
	// this canvas hidden if in viewport mode
	if (game.viewportOn) {
		$('#bg-canvas').hide();
		$('#entity-canvas').hide();
	}
	
	wrap.appendChild(this.titleCanvas);
	wrap.appendChild(this.viewCanvas);
	wrap.appendChild(this.playerCanvas);

	this.clearAllCanvases = function() {
		this.bgCtx.clearRect(
			0, 0,
			this.bgCanvas.width,
			this.bgCanvas.height
		);
		
		this.viewCtx.clearRect(
			0, 0,
			this.viewCanvas.width,
			this.viewCanvas.height
		);
		
		this.titleCtx.clearRect(
			0, 0,
			this.titleCanvas.width,
			this.titleCanvas.height
		);
		
		this.entityCtx.clearRect(
			0, 0,
			this.entityCanvas.width,
			this.entityCanvas.height
		);

		this.playCtx.clearRect(
			0, 0,
			this.playerCanvas.width,
			this.playerCanvas.height
		);
	};
	
	this.clearEntities = function() {
		this.entityCtx.clearRect(
			0, 0,
			this.entityCanvas.width,
			this.entityCanvas.height
		);
	};

	this.clearBackground = function() {
		this.bgCtx.clearRect(
			0, 0,
			this.bgCanvas.width,
			this.bgCanvas.height
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
}