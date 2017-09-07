//countdown is called every second to decrease the current available player time
//if the time falls to zero, the game scene will be replaced by the welcome scene, 
//and the current player will switch(score increases will be added to the current player's score element)

function countDown(){
    var time = document.getElementById('time');
    var lastTime = parseInt(time.innerText);
    lastTime--;
    time.innerText = String(lastTime);
    if(lastTime == 0){//if time runs out
        rounds++;
        if(rounds%2 == 0){
            resetScores();
            alert(returnWinner()+ " won!");
        }
    	gameReady = false;//return to welcome screen
    	console.log('gameReady is '+ gameReady);
    	clearInterval(playing);//stop the clock
    	resetClock();//reset the clock
    	switchActivePlayerScore();//start adding the score increases to the current player's score
    }
}

