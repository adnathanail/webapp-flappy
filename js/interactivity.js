var scores = [];
var scoreNums = [];
$("#scores").on("click",function(){
  $('li').removeClass('active');
  $(this).addClass("active");
  $("#that").empty();
  $("#that").append('<p>The highest scorers are:</p><ul></ul><script>for(i=0;i<scores.length;i++){$("#that ul").append(scores[i])}$("#that").append(\'<a href="#" id="sharing">Share your score on Twitter</a><script>$("#sharing").on("click", function(){var text="I scored "+score.toString()+" in Flappy Nyan! Can you do better?";var escapedText=encodeURIComponent(text);var url ="https:twitter.com/share?text="+escapedText;window.location = url;});</script>\');</script>');
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
      $("#that").append('<a href="#" id="sharing">Share your score on Twitter</a><script>$("#sharing").on("click", function(){var text="I scored "+score.toString()+" in Flappy Nyan! Can you do better?";var escapedText=encodeURIComponent(text);var url ="https:twitter.com/share?text="+escapedText;window.location = url;});</script>');
    }
  }
}
