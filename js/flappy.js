// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);


var score;
score = 0;
var labelScore;
var player;
var up;
var down;
var left;
var right;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/jamesBond.gif");
  game.load.audio("score", "../assets/point.ogg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.stage.setBackgroundColor("#F3D3A3");
  game.add.text(150, 160, "FLAPPY BOND!",{font: "50px Courier", fill: "#9B9B9B"});
  game.add.sprite(10, 10, "playerImg");
  game.add.sprite(750, 10, "playerImg");
  game.add.sprite(750, 360, "playerImg");
  game.add.sprite(10, 360, "playerImg");
  //game.input.onDown.add(clickHandler);
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
  //alert(score);
  labelScore = game.add.text(20, 20, "0");
  player = game.add.sprite(100, 200, "playerImg");
  /*game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);*/
  right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  if(right.isDown){
    player.x += 1;
  } else if(left.isDown){
    player.x -= 1;
  } else if(up.isDown){
    player.y -= 1;
  } else if(down.isDown){
    player.y += 1;
  }
}
function clickHandler(event) {
  game.add.sprite(event.x-15, event.y-15, "playerImg");
}
function spaceHandler() {
    game.sound.play("score");
}
function changeScore() {
	score = score + 1;
  labelScore.setText(score.toString());
}
/*function moveRight() {
	player.x += 10;
}
function moveLeft() {
	player.x -= 10;
}
function moveUp() {
	player.y -= 10;
}
function moveDown() {
	player.x += 10;
}*/
