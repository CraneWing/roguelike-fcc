function EntityGenerator() {
  this.entities = [];
  // running total of all entities added to entArray
  this.totalEntities = 0;
  
  this.createBoss = function() {
    // if an empty tile is found or not
    var foundTile = false;
    // test random tiles until vacant one found
    while(!foundTile) {
      var testTile = this.getRandomTile();
      var t = testTile[0];
      // check tile if glen or path and not occupied
      // by player or entities
    	if ((t.type === 'glen' || t.type === 'path') && 
		  t.occupied === false && t.entType !== 'player') {
		    
		    var tileCol = testTile[1];
		    var tileRow = testTile[2];
		    
		    var boss = new Monster(
          sprites.boss.img,
    			sprites.boss.sourceX,
    			sprites.boss.sourceY,
    		  tileCol * display.TILE_SIZE,
    			tileRow * display.TILE_SIZE,
    			display.TILE_SIZE,
    			display.TILE_SIZE,
    			'Forest Dragon',
    			'boss',
    			this.totalEntities,
    			70, 40
        );
        
        break;
		  }
    }
  }; // createBoss
  
  this.createFood = function() {
    // random minimum and maximum number of food
    // items for each level. data consists of name
    // of each food sprite and points it adds to 
    // player health.
    
    var foodInfo = {
      random: {
        lev1: { min: 8, max: 11 },
        lev2: { min: 14, max: 17 }, 
        lev3: { min: 15, max: 18 },
        lev4: { min: 18, max: 21 },
      },
      data: {
        f1: {
          name: 'Apple',
          adds_health: 10
        },
        f2: {
          name: 'Cherry Bunch',
          adds_health: 10
        },
        f3: {
    			name: 'Carrot',
    			adds_health: 15
    		},
    		f4: {
    			name: 'Mushroom',
    			adds_health: 15
    		},
      	f5: {
    			name: 'Cheese',
    			adds_health: 15
    		},
    		f6: {
    			name: 'Water Jug',
    			adds_health: 20
    		},
    		f7: {
    			name: 'Chicken Leg',
    			adds_health: 25
    		},
    		f8: {
    			name: 'Fish',
    			adds_health: 25
    		},
    		f9: {
    			name: 'Steak',
    			adds_health: 35
    		}
      } 
    }; // foodInfo
    
    var levName = 'lev' + game.level;
    var min = foodInfo.random[levName].min;
  	var max = foodInfo.random[levName].max;
  	var total = getRandom(min, max);
  	var totalAvailable = 9;
  	var prefix = 'f';
  	var count = 0;
  	
  	while (count < total) {
  	  // get random tile to test. returns tile and
  	  // its indexes in 2D board array.
  	  var testTile = this.getRandomTile();
  	  var t = testTile[0];
			// check if tile is glen or path, and then if the tile
			// is empty, including player, and could take an entity.
			if ((t.type === 'glen' || t.type === 'path') && 
			  t.occupied === false && t.entType !== 'player') {
			  
			  var tileCol = testTile[1];
			  var tileRow = testTile[2];
  		 
    	  // random food item
    	  var rand = prefix + getRandom(1, totalAvailable).toString();
  	  
    	  // new food object
    	  var foodItem = new Food(
  				sprites.food[rand].img,
  				sprites.food[rand].sourceX,
  				sprites.food[rand].sourceY,
  				tileCol * display.TILE_SIZE,
  				tileRow * display.TILE_SIZE,
  				display.TILE_SIZE,
  				display.TILE_SIZE,
  				foodInfo.data[rand].adds_health,
  				foodInfo.data[rand].name,
  				'food',
  				this.totalEntities
  			);
			  
			  this.addEntityToArray(foodItem, t, 'food');
			  count++;
  	  }
    	else { 
    	  // random tile was occupied or was a tree,
    	  // so a new random tile is checked.
    		continue;
      }
  	} // while count < total
  }; // createFood
    
  this.createMonsters = function() {
    // info for random generation of number of monsters
    // on a level and random damage monster can 
    // make on player; and random hit points monster can
    // take in player attack.
    
    // each level also has names for each monster by 
    // its "m" prefix that match "m" sprites.
    
    var monsterInfo = {
      lev1: {
        random: {
          min_qty: 6,
          max_qty: 9,
          total_per_level: 5,
          min_damage: 2,
          max_damage: 5,
          min_HP: 10,
          max_HP: 15
        },
        names: {
          m1: 'Humongous Scorpion',
          m2: 'Killer Hornet',
          m3: 'Cater-Slasher',
          m4: 'Giant Disgusting Slug',
          m5: 'Biggest Mosquito Ever!'
        }
      },
      lev2: {
        random: {
          min_qty: 8,
          max_qty: 12,
          total_per_level: 7,
          min_damage: 7,
          max_damage: 12,
          min_HP: 15,
          max_HP: 20
        },
        names: {
          m1: 'Diablo Dog',
          m2: 'Marauder Mud Monster',
          m3: 'Vicious Vampire Bat',
          m4: 'Tricky Tree Troll',
          m5: 'Grimy Green Ghost',
          m6: 'Belligerent Black Widow',
          m7: 'Poison Shooting Toad'
        }
      },
      lev3: {
        random: {
          min_qty: 13,
          max_qty: 18,
          total_per_level: 6,
          min_damage: 10,
          max_damage: 15,
          min_HP: 15,
          max_HP: 25
        },
        names: {
          m1: 'King Size Wandering Brain',
          m2: 'Sapphire Viper',
          m3: 'Purple People Eater',
          m4: 'Slashing Landfish',
          m5: 'Despicable Smoke Monster',
          m6: 'Mutant Mammoth'
        }
      },
      lev4: {
        random: {
          min_qty: 18,
          max_qty: 21,
          total_per_level: 6,
          min_damage: 25,
          max_damage: 35,
          min_HP: 30,
          max_HP: 40
        },
        names: {
          m1: 'Woodland Croc',
          m2: 'Two Headed Hungry Ogre',
          m3: 'Forest Yeti',
          m4: 'Manticore',
          m5: 'Griffin',
          m6: 'Were Bear'
        }
      }
    }; // monsterInfo
    
    var levName = 'lev' + game.level;
    var min = monsterInfo[levName].random.min_qty;
  	var max = monsterInfo[levName].random.max_qty;
  	var total = getRandom(min, max);
  	player.totalMonsters = total;
  	var totalAvailable = monsterInfo[levName].random.total_per_level;
  	var prefix = 'm';
  	var count = 0;
  	
  	while (count < total) {
  	  // get random tile to test. returns tile and
  	  // its indexes in 2D board array.
  	  var testTile = this.getRandomTile();
  	  var t = testTile[0];
  	  
  	  if ((t.type === 'glen' || t.type === 'path') && 
			  t.occupied === false && t.entType !== 'player') {
			  
			  var tileCol = testTile[1];
			  var tileRow = testTile[2];
  	  
    	  var rand = prefix + getRandom(1, totalAvailable).toString();
    	  
    	  var totalHP = getRandom(
    	    monsterInfo[levName].random.min_HP,
    	    monsterInfo[levName].random.max_HP
    	  );
        	  
    	  var damage = getRandom(
    	    monsterInfo[levName].random.min_damage,
    	    monsterInfo[levName].random.max_damage
    	  );
        	  
    	  var monster = new Monster(
  				sprites.monsters[levName][rand].img,
  				sprites.monsters[levName][rand].sourceX,
  				sprites.monsters[levName][rand].sourceY,
  			  tileCol * display.TILE_SIZE,
  				tileRow * display.TILE_SIZE,
  				display.TILE_SIZE,
  				display.TILE_SIZE,
  				monsterInfo[levName].names[rand],
  				'monster',
  				this.totalEntities,
  				totalHP,
  				damage
  			);
  			
  			this.addEntityToArray(monster, t, 'monster');
			  count++;
  	  }
    	else { 
    	  // random tile was occupied or was a tree,
    	  // so a new random tile is checked.
    		continue;
      }
  	} // while count < total 
  }; // createMonster
  
  this.createTreasures = function() {
    // available treasure sprites for each
    // level. also data for treasure on each level
    // with names and values. name extensions are
    // fictional royalty/noble names randomly
    // added to give impression of many different
    // crowns and chalices.
    var treasureInfo = {
      available: {
        lev1: 3,
        lev2: 2,
        lev3: 2,
        lev4: 2
      },
      data: {
        lev1: {
        	t1: {
    				name: 'Sapphire',
    				value: 30
  			  },
    			t2: {
    				name: 'Ruby',
    				value: 30
    			},
    			t3: {
    				name: 'Emerald',
    				value: 30
    			},
    		},
    		lev2: {
    			t1: {
    				name: 'Diamond',
    				value: 90
    			},
    			t2: {
    				name: 'Gold Coins',
    				value: 100
    			},
    		},
    		lev3: {
    			t1: {
    				name: 'Golden Skull',
    				value: 150
    			},
    			t2: {
    				name: 'Treasure Chest',
    				value: 200
    			}
    		},
    		lev4: {
    			t1: {
    				name: 'Crown',
    				value: 400
    			},
    			t2: {
    				name: 'Chalice',
    				value: 300
    			}
    		}
    	},
    	name_extensions: 
  		  [
  		   'Frezida', 'Longon',
      	 'Alzori', 'Zeelynda',
    		 'Molandor', 'Thrain',
    		 'Queryda', 'Flaarolia'
      	]
    }; // treasureInfo
    
    var levName = 'lev' + game.level;
    var total = getRandom(7, 10);
  	var totalAvailable = treasureInfo.available[levName];
  	var prefix = 't';
  	var count = 0;
      	  	
    while (count < total) {
      // get random tile to test. returns tile and
  	  // its indexes in 2D board array.
  	  var testTile = this.getRandomTile();
  	  var t = testTile[0];
  	  
  	  if ((t.type === 'glen' || t.type === 'path') && 
			  t.occupied === false && t.entType !== 'player') {
			  
			  var tileCol = testTile[1];
			  var tileRow = testTile[2];
        var treasureName, owner, rand, name;
  	    // there is a set number of available treasures per
      	// level, with item value increasing on each level. 
      	// on levels 1 and 2, the final item is a more valuable
      	// item "borrowed" from level 3 or 4 treasures.
    	  if (game.level === 1 || game.level === 2) {
    	    if (count !== total - 1) {
      	    rand = prefix + getRandom(1, totalAvailable).toString();
      	  }
      	  else {
            // final, more valuable treasure is selected by
            // randomly selecting level 3 or 4, and then from 
            // that level one of its two items.
      	    levName = (Math.random() < 0.5) ?  'lev3' : 'lev4';
      	    rand = (Math.random() < 0.5) ? 't1' : 't2';
      	  } // else of i !== total - 1
      	} // game.level === 1 || game.level === 2
      	else {
      	  // similar to above, the first  and second treasures 
      	  // of levels 3 and 4 are randomly selected from
      	  // lower value items from 1 and 2.
      	  if (count === 0 || count === 1) {
      	    levName = (Math.random < 0.5) ? 'lev1' : 'lev2';
    	  	  
    	  	  rand = (levName === 'lev1') ?
    	  	   prefix + getRandom(1, 3).toString() :
    	  	   rand = prefix + getRandom(1, 2).toString();
      	  }
      	  else {
      	   rand = prefix + getRandom(1, totalAvailable).toString();
      	  }
      	}
      	
      	// treasure value
  	    var treasureValue = treasureInfo.data[levName][rand].value;
	      
	      name = treasureInfo.data[levName][rand].name;
  	    // chalice or crown gets additional "owner" name.
  	    // otherwise just the name in treasureInfo.
    		if (treasureInfo.data[levName][rand].name === 'Chalice') {
    		  
    		  owner = treasureInfo.name_extensions[getRandom(0, 7)];
    			treasureName = name + ' of ' + owner;
    		}
    		else if (treasureInfo.data[levName][rand].name === 'Crown') {
    		  owner = treasureInfo.name_extensions[getRandom(0, 7)];
    			treasureName = owner + "'s " + name;
    		}
    		else {
    		  treasureName = name;
    		}
          		
  	  	var treasureItem = new Treasure(
  				sprites.treasure[levName][rand].img,
  			  sprites.treasure[levName][rand].sourceX,
  				sprites.treasure[levName][rand].sourceY,
  				tileCol * display.TILE_SIZE,
  				tileRow * display.TILE_SIZE,
  				display.TILE_SIZE,
  				display.TILE_SIZE,
  			  treasureValue,
  			  treasureName,
  				'treasure',
  				this.totalEntities
  			);
  			
  			this.addEntityToArray(treasureItem, t, 'treasure');
  			count++;
			}
			else { 
    	  // random tile was occupied or was a tree,
    	  // so a new random tile is checked.
    		continue;
      }
    } // while count < total
  }; // createTreasure
  
  this.createWeapon = function() {
    // weapon names and damage values for 
    // each level
    var weaponInfo = {
      lev1: {
        name: 'Mace',
        damage: 10,
      },
      lev2: {
        name: ['Bow', 'Basic Sword'],
        damage: 15
      },
      lev3: {
        name: ['MegaSword', 'Scimitar'],
        damage: 25
      },
      lev4: {
        name: 'Battle Axe',
        damage: 30
      }
    }; // weaponInfo
    
    var foundTile = false;
    var levName = 'lev' + game.level;
    var weaponName, weaponDamage, rand, tileX, tileY;
    
    while(!foundTile) {
      var testTile = this.getRandomTile();
  	  var t = testTile[0];
  	  
  	  if ((t.type === 'glen' || t.type === 'path') && 
			  t.occupied === false && t.entType !== 'player') {
			    foundTile = true;
			    tileCol = testTile[1];
			    tileRow = testTile[2];
			    break;
			}
    }
    
    // levels have only one weapon. 2 and 3 have two
    // weapons available, and one of the two is randomly
    // selected for the board.
    if (game.level === 1 || game.level === 4) {
     rand = 'w1';
     weaponName = weaponInfo[levName].name;
    }
	  else { 
      rand = (Math.random() < 0.5) ? 'w1' : 'w2';
      weaponName = (rand === 'w1') ? 
        weaponInfo[levName].name[0] :
        weaponInfo[levName].name[1];
	  }
      	 
    weaponDamage =  weaponInfo[levName].damage;
    
    var weapon = new Weapon(
			sprites.weapons[levName][rand].img,
			sprites.weapons[levName][rand].sourceX,
			sprites.weapons[levName][rand].sourceY,
			tileCol * display.TILE_SIZE,
			tileRow * display.TILE_SIZE,
			display.TILE_SIZE,
			display.TILE_SIZE,
			weaponDamage,
			weaponName,
			'weapon',
			this.totalEntities
		);
		
    this.addEntityToArray(weapon, t, 'weapon');
  }; // createWeapon
  
  // for drawing the entities to board
  this.render = function(bgCtx) {
		for (var i = 0; i < this.entities.length; i++) {
			var e = this.entities[i];
			
			bgCtx.drawImage(
				e.img,
				e.sourceX, e.sourceY,
				display.TILE_SIZE,
				display.TILE_SIZE,
				e.drawX, e.drawY,
				display.TILE_SIZE,
				display.TILE_SIZE
			);
		} // while count < total
	}; // renderEntitites
	
	this.addEntityToArray = function(ent, tile, type) {
		this.entities.push(ent);
    // tile updated to show it is occuipied as
    // well as the entity number and type.
    tile.occupied = true;
  	tile.entNum = this.totalEntities;
  	tile.entType = type;
  	
    this.totalEntities++;
	};
	
	this.getRandomTile = function() {
	  var randCol = getRandom(0, board.cols - 1);
		var randRow = getRandom(0, board.rows - 1);
		// shorter tile variable name
		var tile = board.board[randCol][randRow];
		
		return [tile, randCol, randRow];
	};
}