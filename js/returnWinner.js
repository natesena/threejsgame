//returnWinner.js returns the string of the winner
function returnWinner(){
	var score1El = document.getElementById('p1-score');
	var score2El = document.getElementById('p2-score');
	if(parseInt(score1El.textContent)>parseInt(score2El.textContent)){
		return "Player1";
	}
	else{
		return 'Player2';
	}

}