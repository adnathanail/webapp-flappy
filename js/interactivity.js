var scores = [];
var scoreNums = [];
$("#scores").on("click",function(){
  $('li').removeClass('active');
  $(this).addClass("active");
  $("#that").empty();
  $("#that").append('<p>The highest scorers are:</p><ul></ul><script>for(i=0;i<scores.length;i++){$("#that ul").append(scores[i])}</script>');
});
$("#creds").on("click",function(){
  $('li').removeClass('active');
  $(this).addClass("active");
  $("#that").empty();
  $("#that").append('<div id="credits">Contributors</div><script>jQuery("#credits").on("click", function() {var message = "Game created by Jim!";jQuery("#credits").append("<p>" + message + "</p>");});</script>');
});
$("#help").on("click",function(){
  $('li').removeClass('active');
  $(this).addClass("active");
  $("#that").empty();
  $("#that").append('Don\'t go insane!');
});

function registerScore(score){
  if(score > Math.max(scoreNums)){
    var playerName = prompt("What's your name?");
    var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
    scores.push(scoreEntry);
    scoreNums.push(score);
    if($("#scores").hasClass('active')){
      $("#that ul").empty();
      for(i=0;i<scores.length;i++){$("#that ul").append(scores[i]);}
    }
  }
}
