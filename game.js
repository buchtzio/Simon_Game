var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
$('div#start').on("click", function(){
    if(!started){
        nextSequence();
        started = true;
    }
});
$("div.btn").on("click", function(e){
    var userChosenColour = e.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
    userClickedPattern = [];
    $("h1").text(`${level} שלב`);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    (async function() {
        for (let index = 0; index < gamePattern.length; index++) {
            $(`#${gamePattern[index]}`).fadeIn(100).fadeOut(100).fadeIn(100);
            var sound = gamePattern[index];
            var newSound = new Audio(`./sounds/${sound}.mp3`);
            newSound.play();
            await delay(500);
        }
    })();
}

function playSound(name)
{
    var newSound = new Audio(`./sounds/${name}.mp3`);
    newSound.play();
}
function animatePress(currentColour)
{
    var activeBtn = $(`#${currentColour}`).addClass('pressed');
    setTimeout(function(){
        activeBtn.removeClass('pressed');
    }, 100);
}
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }else {
        console.log("wrong");
        var newSound = new Audio("./sounds/wrong.mp3");
        newSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass('game-over');
        }, 200);
        $("h1").text("המשחק נגמר, לחץ על המסך להתחיל שוב");
        startOver();
    }
}
function startOver()
{
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
