//Magic constants
var width = 640;
var height = 480;
var gravityValue = 800;
var gameSpeed = -300;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
//Initialise variables
var score;
var labelScore;
var player;
var pipes;
var song;
var balloons = [];
var weights = [];
var bootState = {
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
  }
};
var loadState = {
  preload: function(){
    var loading = game.add.text(80,140, 'loading...', {font:'30px Courier', fill:'#ffffff'});
    //Load pictures
    game.load.image("playerImg", "../assets/nyan.png");
    game.load.image("tail", "../assets/tail.png");
    game.load.image("pipeBlock","../assets/pipe2-body.png");
    game.load.image("pipeEnd","../assets/pipe2-end.png");
    game.load.image("mute","../assets/mute.png");
    game.load.image("balloon","../assets/balloons.png");
    game.load.image("weight","../assets/weight.png");
    game.load.spritesheet('background', 'assets/background.png', 202, 202);
    //Load sounds
    game.load.audio("song", "../assets/nyansong.ogg");
    game.state.start('menu');
    song = game.add.audio('song');
    song.play('',0,1,true);
  }
};
var menuState = {
  create: function(){
    var nameLabel = game.add.text(80,80, 'Flappy Nyan', {font:'50px Arial', fill:'#ffffff'});
    var startLabel = game.add.text(80,game.world.height-80, 'Click to start', {font:'25px Arial', fill:'#ffffff'});
    game.input.onDown.add(function(){game.state.start('play');});
  }
};
var playState = {
  create: function(){
    var background00 = game.add.sprite(0, 0, 'background');
    background00.animations.add('play');
    background00.animations.play('play', 10, true);
    var background10 = game.add.sprite(202, 0, 'background');
    background10.animations.add('play');
    background10.animations.play('play', 10, true);
    var background20 = game.add.sprite(404, 0, 'background');
    background20.animations.add('play');
    background20.animations.play('play', 10, true);
    var background30 = game.add.sprite(606, 0, 'background');
    background30.animations.add('play');
    background30.animations.play('play', 10, true);
    var background01 = game.add.sprite(0, 202, 'background');
    background01.animations.add('play');
    background01.animations.play('play', 10, true);
    var background11 = game.add.sprite(202, 202, 'background');
    background11.animations.add('play');
    background11.animations.play('play', 10, true);
    var background21 = game.add.sprite(404, 202, 'background');
    background21.animations.add('play');
    background21.animations.play('play', 10, true);
    var background31 = game.add.sprite(606, 202, 'background');
    background31.animations.add('play');
    background31.animations.play('play', 10, true);
    var background02 = game.add.sprite(0, 404, 'background');
    background02.animations.add('play');
    background02.animations.play('play', 10, true);
    var background12 = game.add.sprite(202, 404, 'background');
    background12.animations.add('play');
    background12.animations.play('play', 10, true);
    var background22 = game.add.sprite(404, 404, 'background');
    background22.animations.add('play');
    background22.animations.play('play', 10, true);
    var background32 = game.add.sprite(606, 404, 'background');
    background32.animations.add('play');
    background32.animations.play('play', 10, true);
    score = -1;
    pipes = [];
    //Add player
    player = game.add.sprite((width/2)-15, (height/2)-15, "playerImg");
    //Add physics
    game.physics.arcade.enable(player);
    player.body.gravity.y = gravityValue;
    //Add 'mute' button
    mute = game.add.button(600, 10, 'mute', function(){song.volume += 1;}, this);
    //mute = new Phaser.Button(game, 200, 200, "mute", function(){song.volume += 1;},this);
    //Add score
    labelScore = game.add.text(20, 20, "0");
    //Add control
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(){
      //Make it jump
      player.body.velocity.y = gameSpeed;
      //Increase the incessant wailing
      song.volume += 0.5;
      if(song.isPlaying){
        song.pause();
      } else{
        song.resume();
      }
    });
    game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(pause);
    //Add pipes
    generatePipe();
    var pipeInterval = 2 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval,generate);
    //Change player anchor for rotation
    player.anchor.setTo(0.5, 0.5);
  },
  update: function(){
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
    tail.body.gravity.y = gravityValue/4;
    //Rotate player to face direction of travel
    player.rotation = Math.atan(player.body.velocity.y / 200);
    checkBonus(balloons, -50);
    checkBonus(weights, 50);
  }
};
var loseState = {
  create: function(){
    var nameLabel = game.add.text(80,80, 'Final score: ' + score.toString(), {font:'50px Arial', fill:'#ffffff'});
    var startLabel = game.add.text(80,game.world.height-80, 'Click to restart', {font:'25px Arial', fill:'#ffffff'});
    game.input.onDown.add(function(){game.state.start('play');});
  }
};
//Setup phaser
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('lose',loseState);
game.state.start('boot');
//Update score variable and on screen
function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}
//Generate pipe
function generatePipe() {
  //Start of gap
  var gapStart = game.rnd.integerInRange(gapMargin, height-gapSize-gapMargin-100);
  for(var topCount=gapStart;topCount>-(2*blockHeight);topCount-=blockHeight){
    addPipeBlock(width,topCount-blockHeight);
  }
  addPipeEnd(width-2,gapStart);
  for(var bottomCount=gapStart+gapSize;bottomCount<height;bottomCount+=blockHeight) {
    addPipeBlock(width, bottomCount);
  }
  addPipeEnd(width-2,gapStart+gapSize);
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
  block.body.velocity.y = 50;
  game.time.events.loop(Phaser.Timer.SECOND, function(){block.body.velocity.y = -block.body.velocity.y;}, this);
}
function addPipeEnd(x, y) {
  //Create pipe block
  var block = game.add.sprite(x,y,"pipeEnd");
  //Add pipe block to pipes array
  pipes.push(block);
  //Add physics to pipes
  game.physics.arcade.enable(block);
  block.body.velocity.x = gameSpeed;
  block.body.velocity.y = 50;
  game.time.events.loop(Phaser.Timer.SECOND, function(){block.body.velocity.y = -block.body.velocity.y;}, this);
}
function gameOver() {
  registerScore(score);
  game.state.start('lose');
  gravityValue = 800;
}
function pause(){
  game.paused = !game.paused;
}
function changeGravity(g) {
  gravityValue += g;
  player.body.gravity.y = gravityValue;
}
function generateBalloons(){
  var bonus = game.add.sprite(width, height, "balloon");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}
function generateWeights(){
  var bonus = game.add.sprite(width, 0, "weight");
  weights.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = game.rnd.integerInRange(60, 100);
}
function generate(){
  num = game.rnd.integerInRange(1,4);
  if(num == 1){
    generateBalloons();
  } else if(num == 2){
    generateWeights();
  } else{
    generatePipe();
  }
}
function checkBonus(bonusArray, bonusEffect) {
    for(var i = bonusArray.length - 1; i >= 0; i--){
        game.physics.arcade.overlap(player, bonusArray[i], function(){
            changeGravity(bonusEffect);
            bonusArray[i].destroy();
            bonusArray.splice(i,1);
        });
    }
}
