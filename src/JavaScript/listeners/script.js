// alert & message
const alert_box = document.getElementById('alert');
const msg = document.getElementById('alert-msg');
const exit_box = document.getElementById('exit');

exit_box.addEventListener('click', function(){
    alert_box.style.display = 'none';
});


// ------------ EVENT LISTENERS ------------//
// click
document.getElementById('click').addEventListener('click', function(){
    alert_box.style.display = "flex";
    msg.innerHTML = "<h5>This is a <u>on click</u> function.</h5><br>This event is triggered when the user clicks on an element.";
});

// mouse up
document.getElementById('over').addEventListener('mouseover', function(){
    alert_box.style.display = "flex";
    msg.innerHTML = "<h5>This is a <u>mouse over</u> function.</h5><br>This event is triggered when the user hovers over an element."
});

// key down
document.body.onkeydown = function(){
    alert_box.style.display = "flex";
    msg.innerHTML = "<h5>This is a <u>keydown</u> function.</h5><br>This event is triggered when the user presses a key."
}

document.addEventListener('keydown', (e) => {
    if(e.key == 'x'){
        msg.innerHTML = "<h5>This is a <u>specified key</u> down function.</h5><br>This event is triggered when the user presses a specified key."
    }
})

// more to come