let gamePatern = [];

let buttonColors = ['red', 'blue', 'green', 'yellow'];

let userClickedPatern = [];

let level = 0;

let score = 0;

let started = false;

// START GAME

$(document).on('keypress', function(event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function nextSequence() {
    userClickedPatern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
    gamePatern.push(randomChosenColor);
    playSound(randomChosenColor);
    $('h1').text('Level ' + level);
    $('h2').text('Score: ' + (score * 100));
    $('h3').text('Tiles left: ' + gamePatern.length);
}

$('.btn').click(function() {
    let userChosenColor = $(this).attr('id');
    userClickedPatern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPatern.length-1);
    if (gamePatern.length >= userClickedPatern.length) {
        $('h3').text('Tiles left: ' + (gamePatern.length - userClickedPatern.length));
    } else {
        $('h3').text('Tiles left: ' + 0);
    }
    
})

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePatern[currentLevel] === userClickedPatern[currentLevel]) {
        if (userClickedPatern.length === gamePatern.length){
            score++;
            $('h2').text('Score: ' + (score * 100));
            setTimeout(function () {
            nextSequence();
          }, 1000); 
        }
      } else {
        let wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass("game-over");
          }, 200);
          $('h1').text('Game Over, Press Any Key to Restart');
          $('h2').text('Your score is ' + (score * 100) + '!');
          startOver();
      }
}

function startOver() {
    score = 0;
    level = 0;
    gamePatern = [];
    started = false;
}