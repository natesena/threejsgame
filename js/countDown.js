function countDown(){
    var time = document.getElementById('time');
    var lastTime = parseInt(time.innerText);
    lastTime--;
    time.innerText = String(lastTime);
    if(lastTime == 0){
    	gameReady = false;
    	console.log('gameReady is '+ gameReady);
    	clearInterval(playing);
    	resetClock();
    	//switch player
    }
}

