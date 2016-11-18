function Player(sprite) {
	this.img = sprite.img;
	this.x = sprite.x; // x coord on sprite sheet
	this.y = sprite.y; // y coord on sprite sheet
	this.h = display.TILE_SIZE; // player height 
	this.w = display.TILE_SIZE; // player width
	this.drawX = 0; // canvas x coord 
	this.drawY = 0; // canvas y coord
	this.speed = 2; // player movement in pixels
	this.totalMonsters = 0; // total monsters to defeated on level
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
	
	this.update = function() {
		// when arrow key pressed, call motion functions for 
		// four directions.
		if (input.pressed[input.keys.right]) this.moveRight();
		if (input.pressed[input.keys.left]) this.moveLeft();
		if (input.pressed[input.keys.up]) this.moveUp();
		if (input.pressed[input.keys.down]) this.moveDown();
	};
	
	this.moveRight = function() {
		var loc = this.getRowAndCol(this.drawX, this.drawY);
		var t = board.board[loc[0]][loc[1]];
		//console.log(loc);
		//console.log(t.type);
		
		var oldX = this.drawX;
		var oldY = this.drawY;
		
		var nextX = this.drawX + this.speed;
		var nextY = this.drawY;
		
		if (t.type === 'tree') {
			console.log("you're on a tree!");
			this.drawX = oldX - this.w/4;
			this.drawY = oldY;
		}
		  
		if (this.drawX > display.gameCanvas.width - player.w) {
			this.drawX = display.gameCanvas.width - player.w;
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
				this.drawX += this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.drawX += this.speed;
		}
	};
	
	this.moveLeft = function() {
		var loc = this.getRowAndCol(this.drawX, this.drawY);
		var t = board.board[loc[0]][loc[1]];
		
		var oldX = this.drawX + this.w;
		var oldY = this.drawY;
		
		var nextX = this.drawX + this.speed;
		var nextY = this.drawY;
		
		// check if player went off left side of canvas
	  if (this.drawX < 0) {
			this.drawX = 0;
		}
		// check for tree collision
		if (t.type === 'tree') {
			console.log("you're on a tree!");
			this.drawX = oldX + this.w/4;
			this.drawY = oldY;
		}
		// check if tile is occupied by monster, treasure,
		// weapon or food
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
				this.drawX -= this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.drawX -= this.speed;
		}
	};
	
	this.moveUp = function() {
		var loc = this.getRowAndCol(this.drawX, this.drawY);
		var t = board.board[loc[0]][loc[1]];
		
		var oldX = this.drawX;
		var oldY = this.drawY;
		
		var nextX = this.drawX + this.speed;
		var nextY = this.drawY;
		
		if (this.drawY < 0) {
			this.drawY = 0;
		}
	
		// check for tree collision
		if (t.type === 'tree') {
			console.log("you're on a tree!");
		  this.drawX = oldX;
			this.drawY = oldY;
		}
		
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
				this.drawY -= this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.drawY -= this.speed;
		}
	};
	
	this.moveDown = function() {
		var loc = this.getRowAndCol(this.drawX, this.drawY);
		var t = board.board[loc[0]][loc[1]];
	
		var oldX = this.drawX;
		var oldY = this.drawY;
		
		var nextX = this.drawX + this.speed;
		var nextY = this.drawY;

		if (this.drawY > display.gameCanvas.height - player.h) {
			this.drawY = display.gameCanvas.height - player.h;
		}
		
		if (t.type === 'tree') {
			console.log("you're on a tree!");
			this.drawX = oldX;
			this.drawY = oldY;
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
				this.drawY += this.speed;
			}
			else {
				this.alive = false;
				this.die();
			}
		}
		else {
			this.drawY += this.speed;
		}
	};
	
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
				console.log('type is weapon');
				console.log(ent);
				this.handleWeapon(ent, tile);
				break;
		}
	}; // handleEntity
	
	this.render = function(gameCtx) {
		gameCtx.drawImage(
			playSpr.idle.img,
			playSpr.idle.x,
			playSpr.idle.y,
			display.TILE_SIZE,
			display.TILE_SIZE,
			this.drawX, this.drawY,
			this.w, this.h
		);
		// draws box around the player to see his
		// bounding box.
		//gameCtx.strokeStyle = '#ff0000';
		//gameCtx.strokeRect(this.drawX, this.drawY, this.w, this.h);
	}; // render
	
	this.handleFood = function(ent, tile) {
		// player health increases
		this.health += ent.addsHealth;
		game.playFoodAud();
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
	};
	
	this.handleWeapon = function(ent, tile) {
		// if player has found more power weapon than they
		// currently have, remove current and replace with
		// new one
		this.weapon.name = ent.name;
		this.weapon.damage = ent.damage;
		ent.removeEntity();
		
		tile.occupied = false;
		tile.entIndex = null;
		
		display.showMessage1("Weapon Upgrade! It's a " +
		  this.weapon.name + " (damage " + this.weapon.damage + ")");
		display.updateWeapon(this.weapon);
		game.playWeaponAud();
		
		
	};
	
	this.handleTreasure = function(ent, tile) {
		console.log(ent);
				
		display.showMessage1('Treasure! ' + ent.name +
		  ', value: ' + ent.value);
	  game.playTreasureAud();
		
		this.treasureVal += ent.value;
		display.updateTreasure(this.treasureVal);
		
		ent.removeEntity();
		
		tile.occupied = false;
		tile.entNum = null;
		tile.entType = null;
	}; // handleTreasure
	
	this.handleMonster = function(ent, tile) {
		if (ent.type === 'boss') {
			display.showMessage1("It's clobbering time! This guy's the boss!");
		}
		
	  ent.hitPoints += this.weapon.damage;
	  var mHP = ent.maxHP - ent.hitPoints;
	  this.health -= ent.damage;
	  
	  display.updateHealth(this.health);
			
		display.showMessage2(ent.name + ' has taken ' + 
			this.weapon.damage + ' damage and has ' + 
		  mHP + ' HP left. You lose ' + ent.damage + ' health');
			
		if (ent.hitPoints >= ent.maxHP) {
			ent.removeEntity();
			
			this.defeated += 1;
			this.experience += 25;
			
			tile.occupied = false;
			tile.entNum = null;
			tile.entType = null;
	  	
	  	if (ent.type === 'monster') {
	  		display.showMessage2('');
		  	display.showMessage1("Huzzah! You've defeated " +
		  	  ent.name + "!");
	      game.playMonsterAud();
	  	}
		  else if (ent.type === 'boss') {
		  	display.showMessage1('');
		  	display.showMessage2('Forsooth, the Boss is Dead!');
		  	this.bossDefeated = true;
		  	game.playMonsterAud();
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
	
	// gets column and row number location on board
	this.getRowAndCol = function(drawX, drawY) {
		var col = Math.round(drawX/display.TILE_SIZE);
		var row = Math.round(drawY/display.TILE_SIZE);
		return [col, row];
	};
	
	this.handleLevel = function() {
		//console.log('in handle level');
	  console.log('monster count is ' + this.totalMonsters);
		console.log('in handleLevel');

			if (this.totalMonsters === 0) {
				if (game.level >= 1 && game.level <= 3) {
					console.log('level 1, 2 or 3 and game not over!');
					game.states.play = false;
					game.states.between = true;
					game.levelReset();
				  game.drawBetween();
				}
				// test if level 4 and all monsters and boss defeated
				else if (game.level === 4 && this.bossDefeated) {
				  console.log('level 4 and boss defeated!');	
					game.level = null;
					game.states.play = false;
					game.states.between = false;
					game.states.game_over = true;
					game.drawEnd();
				}
			}
	};
	
	this.die = function() {
		game.states.play = false;
		game.states.game_over = true;
		display.updateHealth('DEAD');
		display.showMessage1('Sorry, you just died! Play again?');
		display.showMessage2('Hit enter to start a new game.');
	};
	
}