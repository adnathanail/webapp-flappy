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
//Setup pipes variable
var pipes = [];
//Stuff that is needed to be loaded
function preload() {
  //Load a picture call it playerImg
  game.load.image("playerImg", "../assets/nyan.png");
  game.load.image("tail", "../assets/tail.png");
  //Load a sound call it score
  game.load.audio("score", "../assets/point.ogg");
  //Load a pipe image
  game.load.image("pipeBlock","../assets/pipe.png");
}
//Stuff that is run once at the start
function create() {
  //Set the background colour
  game.stage.setBackgroundColor("#F3D3A3");
  //Print some text
  game.add.text(150, 160, "FLAPPY NYAN!",{font: "50px Courier", fill: "#9B9B9B"});
  //Put james bond in all four corners
  //game.add.sprite(10, 10, "playerImg");
  game.add.sprite(750, 10, "playerImg");
  game.add.sprite(750, 360, "playerImg");
  game.add.sprite(10, 360, "playerImg");
  //Print 0 the the screen as a quasi-score
  labelScore = game.add.text(20, 20, "0");
  //Print a player
  player = game.add.sprite(380, 200, "playerImg");
  //Set up game physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  //player.body.velocity.x = 75;
  player.body.gravity.y = 800;
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
  generatePipe();
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval,generatePipe);
}
//Continually runs throughout the game
function update() {
  game.physics.arcade.overlap(player,pipes,gameOver);
  var tail = game.add.sprite(player.x+5,player.y+5,"tail");
  //tail.scale.setTo(0.1, 0.1);
  game.physics.arcade.enable(tail);
  tail.body.velocity.x = -300;
}
function changeScore() {
	score = score + 1;
	labelScore.setText(score.toString());
  game.sound.play("score");
}
function generatePipe() {
  var gap = game.rnd.integerInRange(1 ,5);
  for (var count = 0; count < 8; count++) {
    if (count != gap && count != gap+1) {
      addPipeBlock(790, count * 50);
    }
  }
  changeScore();
}
function addPipeBlock(x, y) {
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipeBlock");
    // insert it in the 'pipes' array
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -300;
}
function playerJump() {
    player.body.velocity.y = -300;
}
function gameOver() {
    location.reload();
}
