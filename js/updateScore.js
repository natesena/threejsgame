//updateScore adds the score to the current player's score on the scoreboard
function updateScore(){
	if(!currentPlayer){
		var scoreEl = document.getElementById('p1-score');
    	scoreEl.textContent = String(score);
	}
	else{
		var scoreEl = document.getElementById('p2-score');
		scoreEl.textContent = String(score);
	}
}
