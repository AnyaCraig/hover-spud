// HOVER GAME - Anya Craig
// Created November/December 2015

var hoverGame = {}; //Global variable

hoverGame.timeoutArray = [];

//The variable which holds the number of seconds it should take for the span colours to fade
hoverGame.delay;

//This function checks which game board is visible and sets the delay to the appropriate amount
hoverGame.setDelay = function() {
  if ($(".game-board-easy").is(":visible")) {
    hoverGame.delay = 3000;
  } else if ($(".game-board-medium").is(":visible")) {
    hoverGame.delay = 4000;
  } else if ($(".game-board-hard").is(":visible")) {
    hoverGame.delay = 5000;
  } else if ($(".game-board-impossible").is(":visible")) {
    hoverGame.delay = 6000;
  }
}


//This function handles the stuff that happens when the user mouses over a span
hoverGame.handleMouseOver = function() {
  //Update the two span variables every time the user mouses over a span
  hoverGame.spans = $(".container span").length;
  hoverGame.spansFilled = $(".container span.filled").length;

  //Add the class of "filled" when the user mouses over a span
  $(this).addClass("filled");

  //Save $this within a variable
  var self= this;

  //so that we can use it in this setTimeout function,
  //which adds a class of "transition" so that the colour fades
  //and then removes the "filled" class,
  //followed by the "transition" class, so that the next time we mouse over the span,
  //the colour doesn't fade in - it just appears

  var timeout = window.setTimeout(function(){
    $(self).addClass("transition");
    $(self).removeClass("filled");
    // console.count()  
  }, hoverGame.delay);

  $(this).removeClass("transition");

  hoverGame.timeoutArray.push(timeout);
  // console.log("Timeout added");

  hoverGame.update();


}

//This function handles the updating of the headings
hoverGame.update = function() {

  //Update the two span variables every time the user mouses over a span
  hoverGame.spans = $(".container span:visible").length;
  hoverGame.spansFilled = $(".container span.filled").length;

  //Show the number of spans(total) and spans(filled) in headings
  $("h3").text(hoverGame.spans);
  $("h4").text(hoverGame.spansFilled);

  
  //when those two amounts are equal, show "YES" in a heading
  if(hoverGame.spans === hoverGame.spansFilled) {
    // console.log("winning!");
    hoverGame.win();
  }
}

hoverGame.win = function(){
    $(".win-time").text(hoverGame.countNumber);
    hoverGame.getLevel();
    if ($(".game-board-easy").is(":visible") || $(".game-board-medium").is(":visible") || $(".game-board-hard").is(":visible")) {
      $(".win-modal").css("display", "flex");
    } else {
      $(".game-over-modal").css("display", "flex");
    }

    console.log("Clearing...");
    clearInterval(hoverGame.timer);

    $(".container span:visible").addClass("over");
    hoverGame.highestScore();
}


hoverGame.highestScore = function(){

  if ($(".game-board-easy").is(":visible")) {

    hoverGame.scoreEasy = hoverGame.countNumber;

    if($(".score-easy .high-score").text() == ""){
       $(".score-easy .high-score").text(hoverGame.scoreEasy + " seconds");
    } else {
      hoverGame.currentScoreEasy = $(".score-easy .high-score").text();
      // console.log(hoverGame.currentScoreEasy);
      if (hoverGame.currentScoreEasy > hoverGame.scoreEasy) {
        $(".score-easy .high-score").text(hoverGame.scoreEasy + " seconds");
      } else {
        return;
      }
    }

  } else if ($(".game-board-medium").is(":visible")) {

    hoverGame.scoreMedium = hoverGame.countNumber;

    if($(".score-medium .high-score").text() == ""){
        $(".score-medium .high-score").text(hoverGame.scoreMedium + " seconds");
    } else {
      hoverGame.currentScoreMedium = $(".score-medium .high-score").text();
      // console.log(hoverGame.currentScoreMedium);
      if (hoverGame.currentScoreMedium > hoverGame.scoreMedium) {
        $(".score-medium .high-score").text(hoverGame.scoreMedium + " seconds");
      } else {
         return;
      }
     }

  } else if ($(".game-board-hard").is(":visible")) {

    hoverGame.scoreHard = hoverGame.countNumber;

    if($(".score-hard .high-score").text() == ""){
        $(".score-hard .high-score").text(hoverGame.scoreHard + " seconds");
    } else {
      hoverGame.currentScoreHard = $(".score-hard .high-score").text();
      // console.log(hoverGame.currentScoreHard);
      if (hoverGame.currentScoreHard > hoverGame.scoreHard) {
        $(".score-hard .high-score").text(hoverGame.scoreHard + " seconds");
      } else {
         return;
      }
     }
  } else {
    hoverGame.scoreImpossible = hoverGame.countNumber;

    if($(".score-impossible .high-score").text() == ""){
        $(".score-impossible .high-score").text(hoverGame.scoreImpossible + " seconds");
    } else {
      hoverGame.currentScoreImpossible = $(".score-impossible .high-score").text();
      // console.log(hoverGame.currentScoreImpossible);
      if (hoverGame.currentScoreImpossible > hoverGame.scoreImpossible) {
        $(".score-impossible .high-score").text(hoverGame.scoreImpossible + " seconds");
      } else {
         return;
      }
    }
  }
}

//This deduces what level the user is on in order to show the level in the "you win" modal

hoverGame.getLevel = function(){
  if ($(".game-board-easy").is(":visible")) {
    hoverGame.currentLevel = "EASY";
    hoverGame.nextLevel = "MEDIUM";
  } else if ($(".game-board-medium").is(":visible")) {
    hoverGame.currentLevel = "MEDIUM";
    hoverGame.nextLevel = "HARD";
  } else if ($(".game-board-hard").is(":visible")) {
    hoverGame.currentLevel = "HARD";
    hoverGame.nextLevel = "IMPOSSIBLE";
  } else {
    hoverGame.currentLevel = "IMPOSSIBLE";
  }
  // console.log(hoverGame.currentLevel);
  $(".level-name").text(hoverGame.currentLevel);
  $(".next-level").text(hoverGame.nextLevel);
}

hoverGame.countNumber = 0;

//This is the function that controls the countup
hoverGame.countUp = function(){
  console.log("Start the countup!")
  hoverGame.timer = setInterval(function() {
      hoverGame.countNumber++;
      console.log("Tick");
      $(".count-up").text(hoverGame.countNumber);
    }, 1000);
}
  

//This function controls what happens when the "start" button is clicked
hoverGame.startGame = function(){
  $(".start-game").css("display", "none");
  hoverGame.countNumber = 0;
  hoverGame.setDelay();
  hoverGame.countUp();
}

//This function controls what happens when the "move on" button is clicked
hoverGame.moveUp = function(){
  if ($(".game-board-easy").is(":visible")) {
    $(".start-game").css("display", "flex");
    // console.log("Moving to medium");
    $(".game-board-medium").css("display", "flex").siblings(".game-board-inner").hide();
    $(".win-modal").hide();
    $(".container span").removeClass("filled");
  } else if ($(".game-board-medium").is(":visible")) {
    $(".start-game").css("display", "flex");
    // console.log("Moving to hard");
    $(".start-game").css("display", "flex");
    $(".game-board-hard").css("display", "flex").siblings(".game-board-inner").hide();
    $(".win-modal").hide();
    $(".container span").removeClass("filled");
  } else if ($(".game-board-hard").is(":visible")) {
    $(".start-game").css("display", "flex");
    // console.log("Moving to impossible");
    $(".game-board-impossible").css("display", "flex").siblings(".game-board-inner").hide();
    $(".win-modal").hide();
    $(".container span").removeClass("filled");
  } else {
    $(".win-modal").hide();
  }
  hoverGame.showLevel();
  hoverGame.spansFilled = 0;
  $(".count-up").text("0");

}

//This function controls what happens when the user wants to start a level - in any scenario
hoverGame.preGame = function(){
  $(".start-game").css("display", "flex");
  $(".win-modal").hide();
  $(".game-over-modal").hide();
  $(".container span").removeClass("filled over transition");
  $(".count-up").text("0");
  hoverGame.setDelay();
  hoverGame.showLevel();
  hoverGame.spansFilled = 0;
  for (var timeout in hoverGame.timeoutArray) {
    window.clearTimeout(timeout);
  }
}
//This function allows the user to play the same level again

hoverGame.sameLevel = function(){
  // console.log("same level again");
  hoverGame.preGame();
}

//This function controls the size of the game-wrapper
hoverGame.setWidth = function() {
  hoverGame.width = $(".game-board").width();
  $(".game-wrapper").css("height", hoverGame.width);
}


hoverGame.showLevel = function(){
  if ($(".game-board-easy").is(":visible")) {
    $(".level-easy").css("background", "#FF462B").siblings().css("background", "transparent");
  } else if ($(".game-board-medium").is(":visible")) {
    $(".level-medium").css("background", "#FF462B").siblings().css("background", "transparent");
  } else if ($(".game-board-hard").is(":visible")) {
    $(".level-hard").css("background", "#FF462B").siblings().css("background", "transparent");
  } else if ($(".game-board-impossible").is(":visible")){
    $(".level-impossible").css("background", "#FF462B").siblings().css("background", "transparent");
  }
}



//This is the init function, which holds everything we want to run as soon as the DOM is ready
hoverGame.init = function() {
  hoverGame.setWidth();
  hoverGame.showLevel();
  $(".start").on("click", hoverGame.startGame);
  $(".move-on").on("click", hoverGame.moveUp);
  $(".try-again").on("click", hoverGame.sameLevel);
  $(".play-more").on("click", hoverGame.sameLevel);


  $(".container span").on("mouseover", hoverGame.handleMouseOver);
  // $(".container").on("mousemove", hoverGame.update);
  $(window).on("resize", hoverGame.setWidth); 
  $(".level-easy").on("click", function(){
    $(this).css("background", "orange").siblings().css("background", "transparent");
    $(".game-board-easy").css("display", "flex").siblings(".game-board-inner").hide();
    hoverGame.preGame();
  });
  $(".level-medium").on("click", function(){
    $(this).css("background", "orange").siblings().css("background", "transparent");
    $(".game-board-medium").css("display", "flex").siblings(".game-board-inner").hide();
    hoverGame.preGame();
  });
  $(".level-hard").on("click", function(){
    $(this).css("background", "orange").siblings().css("background", "transparent");
    $(".game-board-hard").css("display", "flex").siblings(".game-board-inner").hide();
    hoverGame.preGame();
  });
  $(".level-impossible").on("click", function(){
    $(this).css("background", "orange").siblings().css("background", "transparent");
    $(".game-board-impossible").css("display", "flex").siblings(".game-board-inner").hide();
    hoverGame.preGame();
  });
};

//This is the document-ready function - it just holds our init function and everything inside it
$(function() {
  hoverGame.init();
});

//The user gets a warm-up practice game to teach them how to play - maybe 4x4
//In this practice game, they are given instructions - first, "hover over the grid"
//then, once they've hovered, "move your cursor over the grid as quickly as possible"
//"try to fill in the grid before any colours fade"
//then it tells the user when they've won

//Then, the user can choose from one of four levels: easy, medium, hard, and impossible
//The levels are in a gallery-type layout and users can choose their level, which is then highlighted
