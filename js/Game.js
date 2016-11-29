// global variables
var display, board, sprites,
    player, viewport,
    requestId, entityGen;

var game = new Game();
var input = new Input();

// image assets
var imgSources = {
  splash: 'res/img/splash.png',
  sprite_sheet: 'res/img/sprites.png'
};

// listener for loading assets and preparing
// for game start
$(document).ready(function() {
  // create sprites object
  sprites = new Sprites();
  // load images and draw opening splash
  sprites.loadImages(imgSources, game.drawStart);
});

// listener for starting game if enter key
// is pressed
$(document).keydown(function(event) {
  if(input.pressed[input.keys.enter]) {
    game.audio.intro.pause();
    game.states.start = false;
    game.states.play = true;
    game.level = 1;
    game.resetMessages();
    
    init();
  }
});

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
  // to toggle between sound and viewport either
  // on or off
  this.soundOn = true;
  this.viewportOn = true;
 
  var self = this;
  
  this.drawStart = function() {
    // set up canvas to begin
    display = new Display();
    // text displayed over splash
    var introText = {
      title:'The Forest of El-Keim',
      subtitle:'[A Simple Roguelike]',
      instructions: "Instructions: Use arrow keys to explore the forest. Pick up food to gain health. Your first weapon is a stick. Find more powerful weapons on each level. Collect treasure and beat the monsters to gain experience. Defeat all monsters to advance to the next level. There are four levels, with a boss to beat on the fourth.",
      press: 'Hit enter to begin!'
    };
    
    // variables to wrap instructions text
    var maxWidth = 330;
    var x = 300;
    var y = 240;
    var lineHeight = 23;
    // draw splash graphic
    display.titleCtx.drawImage(
      sprites.images.splash,
      0, 0,
      display.bgCanvas.width,
      display.bgCanvas.height,
      0, 0,
      display.bgCanvas.width,
      display.bgCanvas.height
    );
      
    // add the informational text
    display.titleCtx.font = '28px monospace';
    display.titleCtx.fillStyle = '#fff';
    display.titleCtx.fillText(introText.title, 250, 180);
    
    display.titleCtx.font = '16px monospace';
    display.titleCtx.fillStyle = '#fff';
    display.titleCtx.fillText(introText.subtitle, 340, 200);
    
    wrapText(display.titleCtx, introText.instructions, x, y, maxWidth, lineHeight);
    display.titleCtx.font = 'bold 16px monospace';
    display.titleCtx.fillText(introText.press, 360, 520);
    
    self.audio.intro.play();
  }; // drawStart
  
  // displays between game levels as transition
  this.handleBetweenLevels = function() {
    window.cancelAnimationFrame(loop);
    board.boardReady = false;
    
    // text for either level or game ending
    var levelEndText = {
      line1: {
        text: 'A Salute, O Adventurer!',
        x: 235,
        y: 180
      },
      line2: {
        text: "You've defeated all the monsters!",
        x: 225,
        y: 225
      },
      line3: {
        text: 'Get ready for Level ' + game.level,
        x: 300,
        y: 255
      } 
    };
    
    var gameOverText = {
      line1: {
        text: 'A Salute, O Hero!',
        x: 255,
        y: 180
      },
      line2: {
        text: 'YOU HAVE WON',
        x: 400,
        y: 225
      },
      line3: {
        text: 'If you want to play again, hit enter.',
        x: 205,
        y: 255
      }
    };
    
    // hide viewport canvas border during between 
    // graphic display
    display.viewCanvas.setAttribute('style', 'border:0');
    // image is loaded here on the fly because
    // seemed to be the only way to get it to 
    // display on canvas.
    var between = new Image();
    between.src = 'res/img/between.png';
    
    between.onload = function() {
      // play between level music if sound is on
      if (self.soundOn) {
        self.audio.between.play();
      }
      // draw the between level background
      display.titleCtx.drawImage(between,0, 0);
      // text written depends on if level ended 
      // or game itself
      if (game.level >= 1 && game.level <= 4 && !game.states.game_over) {
        self.writeBetweenText(levelEndText);
      }
      else if (game.states.game_over) {
        self.writeBetweenText(gameOverText);
      }
    
      if (game.level <= 4 && !player.bossDefeated) {
        self.pauseBetween();
      }
    };
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

  // writes canvas text between levels and
  // at game end
  this.writeBetweenText = function(text) {
    // set font face and color
    display.titleCtx.font = '30px monospace';
    display.titleCtx.fillStyle = '#fff';
    // draw main title
    display.titleCtx.fillText(
      text.line1.text,
      text.line1.x,
      text.line1.y
    );

    // set smaller text
    display.titleCtx.font = '22px monospace';
    display.titleCtx.fillStyle = '#fff';
    //write second and third lines
    display.titleCtx.fillText(
      text.line2.text,
      text.line2.x,
      text.line2.y
    );

    display.titleCtx.fillText(
      text.line3.text,
      text.line3.x,
      text.line3.y
    );
  }; // writeBetweenText
  
  // entity sound effects as items picked up
  // or monster/boss defeated. plays only if
  // sound turned on
  this.playEntitySound = function(audio) {
    var sound = new Audio(audio);
    // play sound effects only if sound "turned on"
    if (this.soundOn) {
      sound.play();
    }
  };
  
  // creates a short pause between levels so that
  // between message can display
  this.pauseBetween = function() {
    var total = 5;
    var count = 0;
    var counter = window.setInterval(countNums, 900);
    
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
  }; // Game
  
  // this resets all game data in header
  // at start of a new game
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

// general game setup and initialization
function init() {
  console.log('in init; level is ' + game.level);
  // full setup for game beginning
  if (game.level === 1) {
    $('header').css('visibility', 'visible');
    sprites.setSprites(sprites.images.sprite_sheet);
    player = new Player();
    board = new Board();
    entityGen = new EntityGenerator();
    viewport = new Viewport();
    // header variable. if enter key pressed, then
    // show the header along with game board
    $('header').show();
    $('#view-canvas').css('border', '1px solid #000');
   
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
    $('#view-canvas').css('border', '1px solid #000');
    // if board ready, resume animation loop
    if (board.boardReady) {
      loop();
    } 
  }
}

// game loop
function loop() {
  var lastTime = 0;
  var now = Date.now();
  // dt is delta time (time between Dates)
  var	dt = now - lastTime;
  
  lastTime = now;
  
  update(dt);
  
  render(
    display.bgCtx,
    display.playCtx,
    display.viewCtx
  );

  if (game.states.play) {
    window.requestAnimationFrame(loop);
  }
  else if (game.states.between) {
    window.cancelAnimationFrame(loop, display.gameCanvas);
    console.log('loop stopped!');
  }
}

// update player movement
function update(dt) {
	player.update(dt);
}

// draw everything, clearing canvases
// before each re-render
function render(bgCtx, playCtx, viewCtx) {
	display.clearAllCanvases();
	viewport.render(viewCtx);
	
	if (!game.viewportOn) {
	  board.render(bgCtx);
	  entityGen.render(bgCtx);
	}
  
  player.render(playCtx);
}

// canvas text wrap function
// from html5canvastutorials.com
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

/*** button event listeners ***/

// turns sound effects on or off
$('#sound-switch').on('click', function(event) {
  event.preventDefault();
  
  if (game.soundOn) {
    game.soundOn = false;
    
    $(this).text('Sound Off')
    .css({
      'color': '#ff0000',
      'border-color': '#ff0000'
    });
  }
  else {
    game.soundOn = true;
    
    $(this).text('Sound On')
    .css({
      'color': '#fff',
      'border-color': '#fff'
    });
  }
});

// turns viewport on or off
$('#view-switch').on('click', function(event) {
  
  if (game.viewportOn) {
    game.viewportOn = false;
    // turn off viewport canvas
    $('#view-canvas').hide();
    // turn on full background and entity canvases
    $('#bg-canvas').show().css('border', '1px solid #000');;
    $('#entity-canvas').show()
    
    // change text content and color and
    // button border color
    $(this).text('Viewport Off')
    .css({
      'color': '#ff0000',
      'border-color': '#ff0000'
    });
  }
  else {
    game.viewportOn = true;
    $('#view-canvas').show().css('border', '1px solid #000');
    
    $('#bg-canvas').hide().css('border', '0');
    
    $(this).text('Viewport On')
    .css({
      'color': '#fff',
      'border-color': '#fff'
    });
  }
});