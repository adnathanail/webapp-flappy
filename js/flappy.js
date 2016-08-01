//Setup phaser
var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
//Setup score variables
var score;
score = 0;
var labelScore;
//Setup movement variables
var player;
var up;
var down;
var left;
var right;
var space;
//Stuff that is needed to be loaded
function preload() {
  //Load a picture call it playerImg
  game.load.image("playerImg", "../assets/jamesBond.gif");
  //Load a sound call it score
  game.load.audio("score", "../assets/point.ogg");
}
//Stuff that is run once at the start
function create() {
  //Set the background colour
  game.stage.setBackgroundColor("#F3D3A3");
  //Print some text
  game.add.text(150, 160, "FLAPPY BOND!",{font: "50px Courier", fill: "#9B9B9B"});
  //Put james bond in all four corners
  game.add.sprite(10, 10, "playerImg");
  game.add.sprite(750, 10, "playerImg");
  game.add.sprite(750, 360, "playerImg");
  game.add.sprite(10, 360, "playerImg");
  //Print 0 the the screen as a quasi-score
  labelScore = game.add.text(20, 20, "0");
  //Print a player
  player = game.add.sprite(100, 200, "playerImg");
  //Create some key objects
  right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
//Continually runs throughout the game
function update() {
  //Check if keys are down and moves respondingly
  if(right.isDown){
    if(player.x < 760){
      player.x += 1;
      game.add.sprite(player.x, player.y, "playerImg");
    }
  }
  if(left.isDown){
    if(player.x >= 0){
      player.x -= 1;
      game.add.sprite(player.x, player.y, "playerImg");
    }
  }
  if(up.isDown){
    if(player.y >= 0){
      player.y -= 1;
      game.add.sprite(player.x, player.y, "playerImg");
    }
  }
  if(down.isDown){
    if(player.y < 370){
      player.y += 1;
      game.add.sprite(player.x, player.y, "playerImg");
    }
  }
  if(space.isDown){
    game.sound.play("score");
  }
}
//Plays a sound when you clikc space
function spaceHandler() {
    game.sound.play("score");
}
