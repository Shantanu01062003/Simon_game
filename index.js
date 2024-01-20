var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var started = 0;
var level=0;

$(document).keydown(function(){
    if(started===0){       
        started=1;
        $("h1").html("Level " + level)
        nextSequence();
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(color){
    var audio = new Audio('./sounds/' + color + '.mp3')
    audio.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    },100)
}

function nextSequence(){
    level++;
    $("h1").html("Level  " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(currentLevel===level-1){
            while(userClickedPattern.length > 0) {
                userClickedPattern.pop();
            }
            setTimeout(nextSequence(),1000)
        }
        
    }
    else{
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        },200)

        $("h1").html("Game Over, Press Any Key to Restart")
        startover();
    }
}

function startover(){
    started=0;
    level = 0;
    while(gamePattern.length>0){
        gamePattern.pop();
    }
    while(userClickedPattern.length > 0) {
        userClickedPattern.pop();
    }
}






















