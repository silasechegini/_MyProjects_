/*manipulate text area with event listener*/

const WRITEUP = document.querySelector(".sample p").innerHTML;
const TEXTAREA = document.querySelector(".textarea");
const BUTTON = document.querySelector(".button");
const TIMER = document.querySelector(".timer");
var WPS = document.querySelector("#wps");
var ACC = document.querySelector("#acc");


/*functions*/

var timer = [0,0,0,0];
var interval = 0;
var timerIsRunning = false;
var string = "";
var newTimer = [0,0,0,0];
var accuracyCounter = 0;


function leadingZero(time) {
	if(time <= 9){
		time = "0" + time;
	}
	return time;
}


function runTimer(){
	newTimer = timer[0] + ":" + timer[1] + ":" + timer[2] ;
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
	string = TEXTAREA.value;
	let testText = WRITEUP.substring(0, string.length);
	ACC.innerHTML = "Accuracy: " + accuracy() + " %";

	if(string == WRITEUP){
		clearInterval(interval);
		TEXTAREA.style.borderColor = "green";
	}else{
		if(string == testText){
			TEXTAREA.style.borderColor = "blue";
		}else{
			TEXTAREA.style.borderColor = "orange";
			accuracyCounter++;
		}
	}
}

function reset() {
	clearInterval(interval);
	interval = null;
	timer = [0,0,0,0];
	timerIsRunning = false;
	accuracyCounter = 0;
    
	TEXTAREA.value = "";
	TIMER.innerHTML = "00:00:00";
	WPS.innerHTML = "0 words per minute";
	ACC.innerHTML = "Accuracy: 100 %";
	TEXTAREA.style.borderColor = "grey";
}

function wordsPerMin(){
	let numWords = string.split(" ");
	var minutes = parseInt(newTimer[0] + newTimer[1]);
	if(minutes == 0){
		WPS.innerHTML =  numWords.length + " words per minute. ";
	}else{
		let wps = Math.floor(numWords.length / minutes);
		WPS.innerHTML = wps + " words per minute. ";
	}
}

function accuracy(){
	let accuracy_ = (((WRITEUP.length - accuracyCounter)/WRITEUP.length) * 100).toFixed(2);
	return accuracy_;
}

//event listeners
TEXTAREA.addEventListener("keypress", charCount, false);
TEXTAREA.addEventListener("keypress", wordsPerMin, false);
TEXTAREA.addEventListener("keyup", display, false);
BUTTON.addEventListener("click", reset, false);