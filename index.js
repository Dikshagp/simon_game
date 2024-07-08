var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;

var level = 0;


$(document).keydown(function () {
  if (!started) {
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//detect user clicked button
$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor);
  

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//check answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
  

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);
   
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

  function nextSequence() 
  {
    userClickedPattern = [];
    level++;
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColors[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);

    //select the id name with same color name and apply effect
    $("#" + randomChosenColour)
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);

    playSound(randomChosenColour);
    //animatePress(randomChosenColour);
  }
  nextSequence();

  function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");

    audio.play();
  }

  function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, 1000);
  }

//restart the game

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
