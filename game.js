



buttonColours=["red","blue","green","yellow"];
gamePattern=[];
userClickedpattern=[];
var randomchoosencolour;
var userChoosenColour;
var level=0;
var started=false;


function playsound(name){
    var audioname="sounds/"+name+".mp3";
    var audio=new Audio(audioname);
    audio.play();
}



function animatePress(currentColour){
    
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100)

}



function nextSequence(){
    userClickedpattern=[]
    var randomNumber1=Math.floor(Math.random()*4);
    randomchoosencolour=buttonColours[randomNumber1];
    gamePattern.push(randomchoosencolour);
    $("#"+randomchoosencolour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("h1").text("Level "+level);
    
}

$(document).keypress(function(){
    if (!started){
        nextSequence()
        
        started=true;
    }
    

})



$(".btn").click(function(){
    userChoosenColour=(this.id);
    userClickedpattern.push(userChoosenColour);
    playsound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedpattern.length-1);
});



function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedpattern[currentLevel]){
        console.log("true");
        if (gamePattern.length===userClickedpattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playsound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}



function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}