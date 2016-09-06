var playing = false;
var score;
var action;
var timeRemaining;
var answer;

function stopCountDown() {
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function countDown(){
    action = setInterval(function(){
        timeRemaining--;
        document.getElementById("time_remaining").innerHTML = timeRemaining;
        if (timeRemaining === 0){ //game over
            stopCountDown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p> <p>your score is " + score + "</p>";
            hide("time");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("start-reset").innerHTML = "Start Game";
        }
    }, 1000);
}

function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(19*Math.random());
    answer = x * y;
    
    document.getElementById("question").innerHTML = x + " × " + y;
    
    var correct_pos = 1 + Math.round(3*Math.random());
    
    document.getElementById("box" + correct_pos).innerHTML = answer; // fill one box with answer
    
    for(var i = 1; i < 5; i++){
        if(i !== correct_pos){
            var wrong;
            do{
                wrong = (1+Math.round(9*Math.random()))*(1+Math.round(19*Math.random()));
                document.getElementById("box"+i).innerHTML = wrong;
            }
            while(wrong == answer){}
        }
    }
}

document.getElementById("start-reset").onclick = function () {
    if (playing === true) {
        location.reload(); // reloading page
    } else {
        playing = true;
        
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;
        
        timeRemaining = 60;
        document.getElementById("time_remaining").innerHTML = timeRemaining;
        hide("gameOver");
        
        show("time");
        document.getElementById("start-reset").innerHTML = "Reset Game";
        
        //starting countdown
        countDown();
        
        //generate multiple questions
        generateQA();
    }
};

for (var i = 1; i < 5; i++){
    document.getElementById("box"+i).onclick = function() {
        if (playing == true){
            if (this.innerHTML == answer){
                score++;
                document.getElementById("score").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);

                //generate new question
                generateQA();
            } 

            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}