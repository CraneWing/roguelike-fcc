function Player() {
	// sprite animations
	this.idle = sprites.playSprite.idle;
	this.walkRight = sprites.playSprite.walk_right;
	this.walkLeft = sprites.playSprite.walk_left;
	this.walkUp = sprites.playSprite.walk_up;
	this.walkDown = sprites.playSprite.walk_down;
	
	this.h = display.TILE_SIZE; // player height 
	this.w = display.TILE_SIZE; // player width

	this.boardX = 0; // x coord on board world
	this.boardY = 0; // y coord on board world
	this.viewX = 0; // viewport x coord
	this.viewY = 0; // viewport y coord 
	this.speed = 3; // player movement in pixels
	this.animation = null; // directional or idle animation

	this.totalMonsters = 0; // total monsters to defeat on level
	this.experience = 0; // points earned by defeating monsters
	this.treasureVal = 0; // total treasure value
	this.defeated = 0; // total monsters beaten
	this.health = 100;
	this.bossDefeated = false;
	
	this.alive = true;
	// player always begins with a stick.
	this.weapon = {
	  name: 'Stick',
		damage: 5
	};
	
	this.update = function(dt) {
		if (!input.pressed[input.keys.right] &&
		  !input.pressed[input.keys.left] && 
		  !input.pressed[input.keys.up] &&
		  !input.pressed[input.keys.down]) {

			this.animation = new Animate(this.idle, 2);
		}

		// when arrow key pressed, call motion functions for 
		// four directions.
		if (input.pressed[input.keys.left]) {
		  this.moveLeft(dt);
		}

		if (input.pressed[input.keys.right]) {
			this.moveRight(dt);
		}

		if (input.pressed[input.keys.up]) {
			this.moveUp(dt);
		} 
		
		if (input.pressed[input.keys.down]) {
			this.moveDown(dt);
		}
	}; // update
	
	this.moveRight = function(dt) {
		this.animation = new Animate(this.walkRight, this.speed);

		var loc = getRowAndCol(this.boardX, this.boardY);
		//console.log(loc);
		var t = board.board[loc[0]][loc[1]];
		
		var oldX = this.boardX;
		var oldY = this.boardY;
		
		var nextX = this.boardX + this.speed;
		var nextY = this.boardY;
		
		//var test = getRowAndCol(nextX, nextY);
		//console.log(test.type);
		
		if (t.type === 'tree') {
			console.log("you're on a tree!");
			this.boardX = oldX - this.w;
			this.boardY = oldY;
		}
		  
		if (this.boardX > display.playerCanvas.width - this.w) {
			this.boardX = display.playerCanvas.width - this.w;
		}
		
		if ((t.type === 'path' || t.type === 'glen') &&
		  t.occupied === true) {
			
			var ent; 
	    
	    for (var i = 0; i < entityGen.entities.length; i++) {
		    if (t.entNum === entityGen.entities[i].entNum) {
		  		ent = entityGen.entities[i];
		  		break;
		    }
	    }
	    
			this.handleEntity(ent, t);
			// if player didn't get killed by a monster or
			// didn't starve, they can move on.
			if (this.health > 0) {
				this.boardX += this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.boardX += this.speed;
		}

		this.animation.update(dt);
	}; // moveRight
	
	this.moveLeft = function(dt) {
		this.animation = new Animate(this.walkLeft, this.speed);
		var loc = getRowAndCol(this.boardX, this.boardY);
		//console.log(loc);
		var t = board.board[loc[0]][loc[1]];
		
		var oldX = this.boardX + this.w;
		var oldY = this.boardY;
		
		var nextX = this.boardX + this.speed;
		var nextY = this.boardY;
		
		// check if player went off left side of canvas
	   if (this.boardX < 0) {
			this.boardX = 0;
		}
		
		//check for tree collision
		if (t.type === 'tree') {
			console.log("you're on a tree!");
			this.boardX = oldX + this.w/16;
			this.boardY = oldY;
		}
		// check if tile is occupied by an entity - 
		// monster, treasure, weapon or food
		if ((t.type === 'path' || t.type === 'glen') &&
		  t.occupied === true) {
			var ent; 
	    
	    for (var i = 0; i < entityGen.entities.length; i++) {
		    if (t.entNum === entityGen.entities[i].entNum) {
		  		ent = entityGen.entities[i];
		  		break;
		    }
	    }
	    
			this.handleEntity(ent, t);
			// if player didn't get killed by a monster or
			// didn't starve, they can move on.
			if (this.health > 0) {
				this.boardX -= this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.boardX -= this.speed;
		}

		this.animation.update(dt);
	}; // moveLeft
	
	this.moveUp = function(dt) {
		this.animation = new Animate(this.walkUp, this.speed);
		var loc = getRowAndCol(this.boardX, this.boardY);
		//console.log(loc);
		var t = board.board[loc[0]][loc[1]];
		
		var oldX = this.boardX;
		var oldY = this.boardY;
		
		var nextX = this.boardX + this.speed;
		var nextY = this.boardY;
		
		if (this.boardY < 0) {
			this.boardY = 0;
		}
	
		// check for tree collision
		// if (t.type === 'tree') {
		// 	console.log("you're on a tree!");
		//   this.boardX = oldX;
		// 	this.boardY = oldY - player.h;
		// }
		
		// check if tile is occupied by monster, treasure,
		// weapon or food
		if (t.occupied === true) {
			var ent; 
	    for (var i = 0; i < entityGen.entities.length; i++) {
		    if (t.entNum === entityGen.entities[i].entNum) {
		  		ent = entityGen.entities[i];
		  		break;
		    }
	    }
	    
			this.handleEntity(ent, t);
			// if player didn't get killed by a monster or
			// didn't starve, they can move on.
			if (this.health > 0) {
				this.boardY -= this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.boardY -= this.speed;
		}

		this.animation.update(dt);
	}; // moveUp
	
	this.moveDown = function(dt) {
		this.animation = new Animate(this.walkDown, this.speed);

		var loc = getRowAndCol(this.boardX, this.boardY);
		//console.log(loc);
		var t = board.board[loc[0]][loc[1]];
	
		var oldX = this.boardX;
		var oldY = this.boardY;
		
		var nextX = this.boardX + this.speed;
		var nextY = this.boardY;

		if (this.boardY > display.playerCanvas.height - this.h) {
			this.boardY = display.playerCanvas.height - this.h;
		}
		
		if (t.type === 'tree') {
			console.log("you're on a tree!");
			this.boardX = oldX;
			this.boardY = oldY - player.h;
		}
		
		if (t.occupied === true) {
			var ent; 
	    
	    for (var i = 0; i < entityGen.entities.length; i++) {
		    if (t.entNum === entityGen.entities[i].entNum) {
		  		ent = entityGen.entities[i];
		  		break;
		    }
	    }
	    
		this.handleEntity(ent, t);
			// if player didn't get killed by a monster or
			// didn't starve, they can move on.
			if (this.health > 0) {
				this.boardY += this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.boardY += this.speed;
		}

		this.animation.update(dt);
	}; // moveDown
	
	this.handleEntity = function(ent, tile) {
		// get the correct entity by matching its
		// entity number to the occupied tile's 
		// entity number.
		
		switch(tile.entType) {
			case 'food':
			  this.handleFood(ent, tile);
				break;
			case 'monster':
			case 'boss':
				this.handleMonster(ent, tile);
				break;
			case 'treasure':
				this.handleTreasure(ent, tile);
				break;
			case 'weapon':
				this.handleWeapon(ent, tile);
				break;
		}
	}; // handleEntity
	
	this.handleFood = function(ent, tile) {
		console.log(ent);
		// play food pickup sound
		game.playEntitySound('res/audio/food.mp3');
		// player health increases
		this.health += ent.addsHealth;
		// display health boost message
		display.showMessage1('Health boost! You found a '
		  + ent.name + ' worth ' + ent.addsHealth);
		display.updateHealth(this.health);
		// remove entity from array (should also disappear
		// from game board).
		ent.removeEntity();
		// tile is now blank
		tile.occupied = false;
		tile.entNum = null;
		tile.entType = null;
	}; // handleFood
	
	this.handleWeapon = function(ent, tile) {
		// play weapon pickup sound
		game.playEntitySound('res/audio/weapon.mp3');
		// replace player weapon
		this.weapon.name = ent.name;
		this.weapon.damage = ent.damage;
		ent.removeEntity();
		
		tile.occupied = false;
		tile.entIndex = null;
		// display message that weapon was picked up
		display.showMessage1("Weapon Upgrade! It's a " +
		  this.weapon.name + " (damage " + this.weapon.damage + ")");
		display.updateWeapon(this.weapon);
	}; // handleWeapon
	
	this.handleTreasure = function(ent, tile) {	
		// show message treasure picked up and play audio
		game.playEntitySound('res/audio/treasure.mp3');
		
		display.showMessage1('Treasure! ' + ent.name + ', value: ' +
		  ent.value);
		// update total treasure score
		this.treasureVal += ent.value;
		display.updateTreasure(this.treasureVal);
		// remove treasure from screen
		ent.removeEntity();
		
		tile.occupied = false;
		tile.entNum = null;
		tile.entType = null;
	}; // handleTreasure
	
	this.handleMonster = function(ent, tile) {
		// check if this monster is level 4 boss
		if (ent.type === 'boss') {
			display.showMessage1("It's clobbering time! This guy's the boss!");
		}
		// add hit points to monster from player weapon
	  ent.hitPoints += this.weapon.damage;
	  // how many more hit points monster can take
	  var mHP = ent.maxHP - ent.hitPoints;
	  // player health decreased with each attack on
	  // the monster
	  this.health -= ent.damage;
	  // show latest health
	  display.updateHealth(this.health);
			
		display.showMessage2(ent.name + ' has taken ' + 
			this.weapon.damage + ' damage and has ' + 
		  mHP + ' HP left. You lose ' + ent.damage + ' health');
		// if monster hit points exceeded, remove it
		// from the board
		if (ent.hitPoints >= ent.maxHP) {
			game.playEntitySound('res/audio/monster.mp3');
			ent.removeEntity();
			
			this.defeated += 1;
			this.experience += 30;
			
			tile.occupied = false;
			tile.entNum = null;
			tile.entType = null;
	  	// messages vary for monster or boss
	  	if (ent.type === 'monster') {
	  		display.showMessage2('');
		  	display.showMessage1("Huzzah! You've defeated " +
		  	  ent.name + "!");
	  	}
		  else if (ent.type === 'boss') {
		  	display.showMessage1('');
		  	display.showMessage2('Forsooth, the Boss is Dead!');
		  	this.bossDefeated = true;
		  }	
	  	
	  	display.updateDefeated(this.defeated);
	  	display.updateXP(this.experience);
		}
		else {
	     // monster should attack, and player loses health
	     player.health -= ent.damage;
	     display.showMessage1(ent.name + ' attacks! You lose ' +
	     ent.damage + ' points health!');
		      
      if (player.health < 0) {
        this.die();
      }
      else {
      	this.attacked = false;
      	display.showMessage2("You're still in the fight! Attack again!");
      }
		} // if monster.properties.hit_points
	  	
	  	// check if monsters still on board. determines 
	  	// whether level continues or ends.
	  	this.handleLevel();
	}; // handleMonster
	
	this.handleLevel = function() {
	  //console.log('monster count: ' + this.totalMonsters);

		if (this.totalMonsters === 0) {
			if (game.level >= 1 && game.level <= 3) {
				//console.log('level 1, 2 or 3 and game not over!');
				window.cancelAnimationFrame(loop);
				board.board = [];
				
				game.states.play = false;
				game.states.between = true;
				game.levelReset();
			  game.handleBetweenLevels();
			}
			// test if level 4 and all monsters and boss defeated
			else if (game.level === 4 && this.bossDefeated) {
			  //console.log('level 4 and boss defeated!');	
				game.level = null;
				game.states.play = false;
				game.states.between = false;
				game.states.game_over = true;
				game.handleBetweenLevels();
			}
		}
	}; // handleLevel
	
	this.render = function(viewCtx) {
		this.animation.render(viewCtx, this.boardX, this.boardY);
	};
	
	this.die = function() {
		game.states.play = false;
		game.states.game_over = true;
		display.updateHealth('DEAD');
		display.showMessage1('Sorry, you just died! Play again?');
		display.showMessage2('Hit enter to start a new game.');
	};
}