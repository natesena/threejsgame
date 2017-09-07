//resetscores.js
function resetScores(){
	var score1El = document.getElementById('p1-score');
	var score2El = document.getElementById('p2-score');
    score1El.textContent = String(0);
    score2El.textContent = String(0);
}