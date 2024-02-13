const iconOFF = document.getElementById("volumeOff");
const iconON = document.getElementById("volumeOn");
var audio = document.getElementById("audio");

function playAudio(){
    audio.play();
    iconOFF.style.display = "none";
    iconON.style.display = "block";
}

function stopAudio(){
    audio.pause();
    iconOFF.style.display = "block";
    iconON.style.display = "none";
}