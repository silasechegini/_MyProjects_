//manipulate text area with event listener
const WRITEUP = document.querySelector(".sample p").innerHTML;
const TEXTAREA = document.querySelector(".textarea");
const BUTTON = document.querySelector(".button");
const TIMER = document.querySelector(".timer");

//functions

var timer = [0,0,0,0];
var interval = 0;
var timerIsRunning = false;


function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}


function runTimer(){
    let newTimer = timer[0] + ":" + timer[1] + ":" + timer[2] ;
    TIMER.innerHTML = newTimer;
    timer[3]++;

    timer[0] = leadingZero(Math.floor((timer[3]/100)/60)); 
    timer[1] = leadingZero(Math.floor((timer[3]/100) - (timer[0] * 60)));
    timer[2] = leadingZero(Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)));
}

function charCount(){
    let textLength = TEXTAREA.value.length;
    if(textLength === 0 && !timerIsRunning){
        timerIsRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

function display(){
    let string = TEXTAREA.value;
    let testText = WRITEUP.substring(0, string.length);

    if(string == WRITEUP){
        clearInterval(interval);
        TEXTAREA.style.borderColor = "green";
    }else{
        if(string == testText){
            TEXTAREA.style.borderColor = "blue";
        }else{
            TEXTAREA.style.borderColor = "orange";
        }
    }
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerIsRunning = false;
    
    TEXTAREA.value = "";
    TIMER.innerHTML = "00:00:00";
    TEXTAREA.style.borderColor = "grey";
}

//event listeners
TEXTAREA.addEventListener("keypress", charCount, false);
TEXTAREA.addEventListener("keyup", display, false);
BUTTON.addEventListener("click", reset, false);