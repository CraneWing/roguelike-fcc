// global variables
var game, display, board, sprites,
    input, grass, trees, monsters, 
    weapons, food, boss, player,
    playSpr, chime, requestId,
    entityGen;

// on page load, instantiate game
game = new Game();
// add listener for initial game splash to appear
window.addEventListener('load', game.drawStart);
// listener for starting game if enter key
// is pressed
window.addEventListener('keydown', game.startGame);

function Game() {
  // various game states
  this.states = {
  	start: true,
  	play: false,
  	between: false,
  	game_over: false
  };
  // level has no value till game starts
  this.level = null;
  // musical themes for intro splash and
  // between game levels
  this.audio = {
    intro: new Audio('res/audio/intro-music.mp3'),
    between: new Audio('res/audio/end-of-level.mp3')
  };
 
  var self = this;
  
  this.drawStart = function() {
    // set up canvas to begin
    display = new Display();
    // input needed to power enter key to start game
    input = new Input();
    // create image for the intro splash
    var splash = new Image();
    splash.src = 'res/img/game-splash.png';
    // this text displays over the splash 
    var title = 'The Forest of El-Keim';
    var subtitle = '[A Simple Roguelike]';
    var press = 'Hit enter to begin!';
    var instructions = "Instructions: Use arrow keys to explore the forest. Pick up food to gain health. Your first weapon is a stick. Find more powerful weapons on each level. Collect treasure and beat the monsters to gain experience. Defeat all monsters to advance to the next level. There are four levels, with a boss to beat on the fourth.";
    // vars to properly wrap game instruction text
    var maxWidth = 330;
    var x = 300;
    var y = 240;
    var lineHeight = 23;
    
    splash.onload = function() {
      // draw the splash
      display.bgCtx.drawImage(
        splash, 0, 0,
        display.bgCanvas.width,
        display.bgCanvas.height,
        0, 0,
        display.bgCanvas.width,
        display.bgCanvas.height
      );
      
      // add the informational text
      display.bgCtx.font = '28px monospace';
      display.bgCtx.fillStyle = '#fff';
      display.bgCtx.fillText(title, 335, 180);
      
      display.bgCtx.font = '16px monospace';
      display.bgCtx.fillStyle = '#fff';
      display.bgCtx.fillText(subtitle, 340, 200);
      
      wrapText(display.bgCtx, instructions, x, y, maxWidth, lineHeight);
      display.bgCtx.font = 'bold 16px monospace';
      display.bgCtx.fillText(press, 360, 520);
      
      // play intro theme
      self.audio.intro.play();
    };
  }; // drawStart
  
  // displays between game levels as transition.
  // first draws "between" background and message 
  // congratulating player on completing level.
  this.drawBetween = function() {
    // board is deactivated
    board.boardReady = false;
    
    // briefly stop the game loop
    if (game.states.between) {
      window.cancelAnimationFrame(loop);
    }
    
    // background image
    var betweenImg = new Image();
    betweenImg.src = 'res/img/between.png';
    // congratulatory text
    var text1 = 'A Salute, O Adventurer!';
    var text2 = "You've defeated all the monsters!";
    var text3 = 'Get ready for Level ' + game.level;
    
    // draw image to canvas once loaded and 
    // add text
    betweenImg.onload = function() {
      display.bgCtx.drawImage(
        betweenImg, 0, 0,
        display.bgCanvas.width,
        display.bgCanvas.height,
        0, 0,
        display.bgCanvas.width,
        display.bgCanvas.height
      );
     
      display.bgCtx.font = '30px monospace';
      display.bgCtx.fillStyle = '#fff';
      display.bgCtx.fillText(text1, 235, 180);
      
      display.bgCtx.font = '22px monospace';
      display.bgCtx.fillStyle = '#fff';
      display.bgCtx.fillText(text2, 225, 225);
      display.bgCtx.fillText(text3, 300, 255);
      
      self.audio.between.play();
      
      if (game.level <= 4 && !player.bossDefeated) {
        self.pauseBetween();
      }
    };
  };
  
  // ending similar to between graphic
  this.drawEnd = function() {
    window.cancelAnimationFrame(loop);
    display.clearAllCanvases();
    // background image
    var betweenImg = new Image();
    betweenImg.src = 'res/img/between.png';
    
    var text1 = 'A Salute, O Hero!';
    var text2 = 'YOU HAVE WON.';
    var text3 = 'If you want to play again, hit enter.';
    
    betweenImg.onload = function() {
      display.bgCtx.drawImage(
        betweenImg, 0, 0,
        display.bgCanvas.width,
        display.bgCanvas.height,
        0, 0,
        display.bgCanvas.width,
        display.bgCanvas.height
      );
      // then writes text to canvas
      display.bgCtx.font = '30px monospace';
      display.bgCtx.fillStyle = '#fff';
      display.bgCtx.fillText(text1, 255, 180);
      
      display.bgCtx.font = '22px monospace';
      display.bgCtx.fillStyle = '#fff';
      display.bgCtx.fillText(text2, 400, 225);
      display.bgCtx.fillText(text3, 205, 255);
      
      self.audio.between.play();
    };
  };
  
  this.startGame = function(event) {
    // event listener to detect enter key press.
    // game state from "start" to "play".
    if(input.pressed[input.keys.enter]) {
      self.audio.intro.pause();
      game.states.start = false;
      game.states.play = true;
      self.level = 1;
      self.resetMessages();
      init();
    }
  };
  
  // reset for beginning of new level
  this.levelReset = function() {
    game.level++;
    display.showMessage1('');
    display.showMessage2('');
    entityGen.entities = [];
    entityGen.totalEntities = 0;
		board.board = [];
  };
  
  // sound effects for entities as they
  // are picked up
  this.playFoodAud = function() {
    var foodSound = new Audio('res/audio/food.mp3');
        foodSound.play();
  };
  
  this.playMonsterAud = function() {
    var monsterSound = new Audio('res/audio/monster.mp3');
    monsterSound.play();
  };
  
  this.playTreasureAud = function() {
    var treasureSound = new Audio('res/audio/treasure.mp3');
    treasureSound.play();
  };
  
  this.playWeaponAud = function() {
    var weaponSound = new Audio('res/audio/weapon.mp3');
    weaponSound.play();
  };
  
  // pause function to display end of level
  // graphic and message before new level loads
  this.pauseBetween = function() {
    var total = 5;
    var count = 0;
    var counter = window.setInterval(countNums, 800);
    
    function countNums() {
      count++;
      console.log('count is ' + count);
      if (count >= total) {
        window.clearInterval(counter);
        game.states.between = false;
        game.states.play = true;
        init();
      }
    }
  };
  
  // this resets all game data in the header
  // in preparation for a new game to begin.
  this.resetMessages = function() {
    display.showMessage1('');
    display.showMessage2('');
    display.updateHealth(100);
    display.updateLevel(1);
    display.updateTreasure(0);
    display.updateWeapon({ name: 'Stick', damage: 5 });
    display.updateDefeated(0);
    display.updateXP(0);
  };
  
}

// game loop
function loop() {
  var lastTime,
  	  now = Date.now(),
  	  dt = now - lastTime;
  
  update(dt);
  render(display.bgCtx, display.gameCtx);
  
  lastTime = now;
  
  if (game.states.play) {
    requestId = window.requestAnimationFrame(loop);
  }
  else if (game.states.between) {
    window.cancelAnimationFrame(loop, display.gameCanvas);
    console.log('loop stopped!');
  }
}

// initiates objects and other values to 
// start the game
function init() {
  console.log('in init; level is ' + game.level);
  // full setup for game beginning
  if (game.level === 1) {
    sprites = new Sprite('res/img/game-sprites-32.png');
    player = new Player(playSpr.idle);
    board = new Board();
    entityGen = new EntityGenerator();
    // header variable. if enter key pressed, then
    // show the header along with game board
    var head = document.getElementById('head');
    head.setAttribute('style', 'visibility:visible');
   
    board.setUpBoard();
    game.states.play = true;
    loop();
  }
  else {
    // just increment level and generate 
    // a new game board.
    display.updateLevel(game.level);
    display.clearAllCanvases();
    
    board = new Board();
    board.setUpBoard();
    // if board ready, resume animation loop
    if (board.boardReady) {
      loop();
    }
    
  }
}

// update player movement
function update(dt) {
	player.update(dt);
}

// draw everything, clearing canvases
// before each re-render
function render(bgCtx, gameCtx) {
	display.clearAllCanvases();
	board.render(bgCtx);
  entityGen.render(gameCtx);
  player.render(gameCtx);
}

// text wrap function from html5canvastutorials.com
function wrapText(ctx, instructions, x, y, maxWidth, lineHeight) {
  var words = instructions.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  
  ctx.fillText(line, x, y);
}
