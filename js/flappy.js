//Magic constants
var width = 790;
var height = 400;
var gravityValue = 800;
var gameSpeed = -300;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
//Setup phaser
var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
//Initialise variables
var score = -1;
var labelScore;
var player;
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
  //Add player
  player = game.add.sprite((width/2)-15, (height/2)-15, "playerImg");
  //Add physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = gravityValue;
  //Add music
  song = game.add.audio('song');
  song.play('',0,1,true);
  song.pause();
  //Colour the background
  game.stage.setBackgroundColor("#124376");
  //Add score
  labelScore = game.add.text(20, 20, "0");
  //Add control
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
  game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(pause);
  //Add pipes
  generatePipe();
  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval,generatePipe);
  //Change player anchor for rotation
  player.anchor.setTo(0.5, 0.5);
}
//Continually runs throughout the game
function update() {
  //Collision and edge detection
  game.physics.arcade.overlap(player,pipes,gameOver);
  if(player.y > (height-25) || player.y < 0){
    gameOver();
  }
  //Add tail
  var tail = game.add.sprite(player.x-15,player.y-10,"tail");
  player.bringToTop();
  game.physics.arcade.enable(tail);
  tail.body.velocity.x = gameSpeed;
  tail.body.gravity.y = gravityValue/2;
  //Rotate player to face direction of travel
  player.rotation = Math.atan(player.body.velocity.y / 200);
}
//Update score variable and on screen
function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}
//Generate pipe
function generatePipe() {
  //Start of gap
  var gapStart = game.rnd.integerInRange(gapMargin, height-gapSize-gapMargin);
  for(var topCount=gapStart;topCount>0;topCount-=blockHeight){
    addPipeBlock(width,topCount-blockHeight);
  }
  for(var bottomCount=gapStart+gapSize;bottomCount<height;bottomCount+=blockHeight) {
    addPipeBlock(width, bottomCount);
  }
  changeScore();
}
//Add pipe
function addPipeBlock(x, y) {
  //Create pipe block
  var block = game.add.sprite(x,y,"pipeBlock");
  //Add pipe block to pipes array
  pipes.push(block);
  //Add physics to pipes
  game.physics.arcade.enable(block);
  block.body.velocity.x = gameSpeed;
}
function playerJump() {
  //Make it jump
  player.body.velocity.y = gameSpeed;
  //Increase the incessant wailing
  song.volume += 0.5;
  if(song.isPlaying){
    song.pause();
  } else{
    song.resume();
  }
}
function gameOver() {
  location.reload();
}
function pause(){
  game.paused = !game.paused;
}
