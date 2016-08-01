//Setup phaser
var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
//Setup variables
var score;
score = 0;
var labelScore;
var player;
var up;
var down;
var left;
var right;
var space;
var pipes = [];
var song;
//Stuff that is needed to be loaded
function preload() {
  //Load pictures
  game.load.image("playerImg", "../assets/nyan.png");
  game.load.image("tail", "../assets/tail.png");
  game.load.image("pipeBlock","../assets/pipe_pink.png");
  //Load sounds
  game.load.audio("score", "../assets/point.ogg");
  game.load.audio("song", "../assets/nyansong.ogg");
}
//Stuff that is run once at the start
function create() {
  //Add music
  song = game.add.audio('song');
  game.stage.setBackgroundColor("#124376");
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
  if(player.y > 350 || player.y < 0){
    gameOver();
  }
  var tail = game.add.sprite(player.x+5,player.y+5,"tail");
  //tail.scale.setTo(0.1, 0.1);
  game.physics.arcade.enable(tail);
  tail.body.velocity.x = -300;
  tail.body.gravity.y = 400;
  if(!song.isPlaying){
    song.play();
  }
}
function changeScore() {
	score = score + 1;
	labelScore.setText(score.toString());
  //game.sound.play("score");
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
    song.volume += 0.1;
    console.log(song.volume);
}
function gameOver() {
    location.reload();
}
