//resetClock resets the clock to 60 seconds
function resetClock(){
    var time = document.getElementById('time');
    var resetTime = parseInt(time.innerText);
    resetTime = 60;
    time.innerText = String(resetTime);
}