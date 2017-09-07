function countDown(){
    var time = document.getElementById('time');
    var lastTime = parseInt(time.innerText);
    lastTime--;
    time.innerText = String(lastTime);
    if(lastTime == 0){
    //switch players with delay
    //gameOver
    }
}

