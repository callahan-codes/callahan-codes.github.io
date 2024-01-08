// CLOCK FUNCTION

setInterval(showTime, 1000);
function showTime() {

    let clock_time = new Date();
    let clock_hour = clock_time.getHours();
    let clock_min = clock_time.getMinutes();
    let clock_sec = clock_time.getSeconds();
    am_pm = "AM";
 
    if (clock_hour >= 12) {
        if (clock_hour > 12) clock_hour -= 12;
        am_pm = " pm";
    } else if (clock_hour == 0) {
        hr = 12;
        am_pm = " am";
    }
 
    clock_hour =
        clock_hour < 10 ? "0" + clock_hour : clock_hour;
        clock_min = clock_min < 10 ? "0" + clock_min : clock_min;
        clock_sec = clock_sec < 10 ? "0" + clock_sec : clock_sec;
 
    let currentTime =
        clock_hour +
        ":" +
        clock_min +
        ":" +
        clock_sec +
        am_pm;
 
    document.getElementById("clock").innerHTML = currentTime;
}
showTime();



// COUNTDOWN FUNCTION
//new Date("Jan 7, 2025 00:00:00").getTime();
var start_date = new Date("Jan 1, 2025 00:00:00").getTime();



var x = setInterval(function() {

  var now = new Date().getTime();
  var distance = start_date - now;
    
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "expired";
  }
}, 1000);



// TIMER FUNCTION
var timer_hours = 0;
var timer_minutes = 0;
var timer_seconds = 0; 
var timer_tens = 0;

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
    timer_hours = "00";
    timer_minutes = "00";
    timer_tens = "00";
    timer_seconds = "00";
    appendMinutes.innerHTML = timer_minutes;
    appendTens.innerHTML = timer_tens;
    appendSeconds.innerHTML = timer_seconds;
}

function startTimer () {
    timer_tens++; 
    
    if (timer_tens <= 9){
        appendTens.innerHTML = "0" + timer_tens;
    }
    
    if (timer_tens > 9){
        appendTens.innerHTML = timer_tens;
    
    } 
    
    if (timer_tens > 99) {
        timer_seconds++;
        appendSeconds.innerHTML = "0" + timer_seconds;
        timer_tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    
    if (timer_seconds > 9){
        appendSeconds.innerHTML = timer_seconds;
    }

    if (timer_seconds > 59) {
        timer_seconds = 0;
        appendSeconds.innerHTML = "0" + timer_seconds;
        timer_minutes++;
        appendMinutes.innerHTML = "0" +timer_minutes;
    }

    if (timer_minutes >= 10 && timer_minutes < 60) {
        appendMinutes.innerHTML = timer_minutes;
    }

    if (timer_minutes > 59) {
        timer_minutes = 0;
        appendMinutes.innerHTML = "0" + timer_minutes;
        timer_hours++;
        appendHours.innerHTML = "0" + timer_hours;
    }


    if (timer_hours > 9) {
        appendHours.innerHTML = timer_hours;
    }

}