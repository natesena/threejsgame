//reset clock
function resetClock(){
    var time = document.getElementById('time');
    var resetTime = parseInt(time.innerText);
    resetTime = 60;
    time.innerText = String(resetTime);
}