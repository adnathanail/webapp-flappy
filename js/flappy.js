//Magic constants
var width = 650;
var height = 500;
var gravityValue = 800;
var gameSpeed = -300;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
//Initialise variables
var homerScore;
var homerLabelScore;
var margeScore;
var margeLabelScore;
var homerTouching = false;
var margeTouching = false;
var homer;
var marge;
var pipes;
var color = "000000";
var bootState = {
  create: function(){
    game.stage.setBackgroundColor("#FFD90F");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
  }
};
var loadState = {
  preload: function(){
    var loading = game.add.text(80,140, 'loading...', {font:'30px Courier', fill:'#ffffff'});
    //Load pictures
    game.load.image("homer", "../assets/homer.png");
    game.load.image("marge", "../assets/marge.png");
    game.load.image("pipeBlock","../assets/pipe2-body.png");
    game.load.image("pipeEnd","../assets/pipe2-end.png");
    game.load.audio("song", "../assets/simpsonsong.ogg");
    game.load.audio("hmm", "../assets/margenoise.ogg");
    game.load.audio("doh", "../assets/homernoise.ogg");
    game.state.start('menu');
    song = game.add.audio('song');
    hmm = game.add.audio('hmm');
    hmm.volume = 10;
    doh = game.add.audio('doh');
    doh.volume = 10;
    song.play('',0,1,true);
  }
};
var menuState = {
  create: function(){
    game.stage.setBackgroundColor("#FFD90F");
    var nameLabel = game.add.text(80,80, 'Flappy Nyan', {font:'50px Arial', fill:'#ffffff'});
    var startLabel = game.add.text(80,game.world.height-80, 'Click to start', {font:'25px Arial', fill:'#ffffff'});
    game.input.onDown.add(function(){game.state.start('play');});
  }
};
var playState = {
  create: function(){
    homerScore = 99;
    margeScore = 99;
    pipes = [];
    //Add player
    homer = game.add.sprite((width/2)-15, (height/2)-15, "homer");
    marge = game.add.sprite((width/4)-15, (height/2)-15, "marge");
    //Add physics
    game.physics.arcade.enable(homer);
    game.physics.arcade.enable(marge);
    homer.body.gravity.y = gravityValue;
    marge.body.gravity.y = gravityValue;
    //Colour the background
    game.stage.setBackgroundColor("#" + color.toString());
    //Add score
    homerLabelScore = game.add.text(20, 20, "0");
    margeLabelScore = game.add.text(20, 60, "0");
    //Add control
    game.input.keyboard.addKey(Phaser.Keyboard.H).onDown.add(homerJump);
    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(margeJump);
    game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(pause);
    //Add pipes
    generatePipe();
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval,generatePipe);
    //Change player anchor for rotation
    homer.anchor.setTo(0.5, 0.5);
    marge.anchor.setTo(0.5, 0.5);
  },
  update: function(){
    color = parseInt(((homerScore + margeScore) * 100).toString(),16).toString();
    while(color.length < 6){
      color = "0" + color;
    }
    game.stage.setBackgroundColor("#" + color);
    //Collision and edge detection
    if(game.physics.arcade.overlap(homer,pipes)){
      if(!homerTouching){
        homerLoses(10);
        doh.play();
        homerTouching = true;
      }
    } else{
      homerTouching = false;
    }
    if(game.physics.arcade.overlap(marge,pipes)){
      if(!margeTouching){
        margeLoses(10);
        hmm.play();
        margeTouching = true;
      }
    } else{
      margeTouching = false;
    }
    if(homer.y > (height-25) || homer.y < 0){
      homerLoses(10);
      homer.y = height / 2;
      homer.body.velocity.y = 0;
    }
    if(marge.y > (height-25) || marge.y < 0){
      margeLoses(10);
      marge.y = height / 2;
      marge.body.velocity.y = 0;
    }
    if(homerScore < -1 || margeScore < -1){
      gameOver();
    }
    //Rotate player to face direction of travel
    homer.rotation = Math.atan(homer.body.velocity.y / 200);
    marge.rotation = Math.atan(marge.body.velocity.y / 200);
    margeLabelScore.setText(margeScore.toString());
    homerLabelScore.setText(homerScore.toString());
  }
};
var loseState = {
  create: function(){
    game.add.text(80,80, 'Homer score: ' + homerScore.toString(), {font:'50px Arial', fill:'#ffffff'});
    game.add.text(80,160, 'Marge score: ' + margeScore.toString(), {font:'50px Arial', fill:'#ffffff'});
    game.add.text(80,game.world.height-80, 'Click to restart', {font:'25px Arial', fill:'#ffffff'});
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
  homerScore += 1;
  margeScore += 1;

}
//Generate pipe
function generatePipe() {
  //Start of gap
  var gapStart = game.rnd.integerInRange(gapMargin, height-gapSize-gapMargin-100);
  for(var topCount=gapStart;topCount>-(2*blockHeight);topCount-=blockHeight){
    addPipeBlock(width,topCount-blockHeight);
  }
  addPipeEnd(width-2,gapStart);
  if(gapStart <= 150){
    addPipeBlock(width,gapStart+gapSize);
    addPipeEnd(width-2,gapStart + gapSize);
    addPipeBlock(width,gapStart+gapSize +50);
    addPipeEnd(width-2,gapStart + gapSize + 100);
    for(var bottomCount=gapStart+gapSize+200;bottomCount<height;bottomCount+=blockHeight) {
      addPipeBlock(width, bottomCount);
    }
    addPipeEnd(width-2,gapStart + gapSize + 200);
  } else{
    for(var bottomCount=gapStart+gapSize;bottomCount<height;bottomCount+=blockHeight) {
      addPipeBlock(width, bottomCount);
    }
    addPipeEnd(width-2,gapStart+gapSize);
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
function homerJump() {
  //Make it jump
  homer.body.velocity.y = gameSpeed;
  //Increase the incessant wailing
  song.volume += 0.5;
}
function margeJump() {
  //Make it jump
  marge.body.velocity.y = gameSpeed;
  //Increase the incessant wailing
  song.volume += 0.5;
}
function homerLoses(amount){
  homerScore = homerScore - amount;
}
function margeLoses(amount){
  margeScore = margeScore - amount;
}
function gameOver() {
  registerScore(Math.max.apply(Math, [homerScore,margeScore]));
  game.state.start('lose');
}
function pause(){
  game.paused = !game.paused;
}
