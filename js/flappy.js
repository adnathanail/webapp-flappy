var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score;
score = 0;
var labelScore;
var player;
var up;
var down;
var left;
var right;
function preload() {
  game.load.image("playerImg", "../assets/jamesBond.gif");
  game.load.audio("score", "../assets/point.ogg");
}
function create() {
  game.stage.setBackgroundColor("#F3D3A3");
  game.add.text(150, 160, "FLAPPY BOND!",{font: "50px Courier", fill: "#9B9B9B"});
  game.add.sprite(10, 10, "playerImg");
  game.add.sprite(750, 10, "playerImg");
  game.add.sprite(750, 360, "playerImg");
  game.add.sprite(10, 360, "playerImg");
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, "0");
  player = game.add.sprite(100, 200, "playerImg");
  right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}
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
