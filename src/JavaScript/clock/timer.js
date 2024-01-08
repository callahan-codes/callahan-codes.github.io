var hours = 0;
var minutes = 0;
var seconds = 0; 
var tens = 0;

var appendHours = document.getElementById('hours');
var appendMinutes = document.getElementById('minutes');
var appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById("seconds");

var buttonStart = document.getElementById('btn1');
var buttonStop = document.getElementById('btn2');
var buttonReset = document.getElementById('btn3');
var Interval ;

buttonStart.onclick = function() {
    
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

    buttonStop.onclick = function() {
        clearInterval(Interval);
}


buttonReset.onclick = function() {
    clearInterval(Interval);
    minutes = "00";
    tens = "00";
    seconds = "00";
    appendMinutes.innerHTML = minutes;
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
}

    

function startTimer () {
    tens++; 
    
    if (tens <= 9){
        appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
        appendTens.innerHTML = tens;
    
    } 
    
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }

    if (seconds > 59) {
        seconds = 59;
        appendSeconds.innerHTML = "0" + seconds;
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
    }

    if (minutes <= 9) {
        appendMinutes.innerHTML = "0" + minutes;
    }

    if (minutes >= 10 && minutes < 60) {
        appendMinutes.innerHTML = minutes;
    }

    if (minutes > 59) {
        minutes = 0;
        appendMinutes.innerHTML = "0" + minutes;
        hours++;
        appendHours.innerHTML = "0" + hours;
    }


    if (hours > 9) {
        appendHours.innerHTML = hours;
    }

}