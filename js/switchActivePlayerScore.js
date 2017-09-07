//switch active player score adds an asterisk next to the score of the current player
//resetActivePlayerScore resets the active player names on the scoreboard to pre-asterisk times

var player1El = document.getElementById('p1');
var player2El = document.getElementById('p2');
    // console.log('playerOneEl: '+player1El);

function switchActivePlayerScore(){
    resetActivePlayerScore();
    var player1Name = player1El.innerText;
    var player2Name = player2El.innerText;
    if(currentPlayer){
        player1El.style.color = randomColor();
        player1Name = "*"+ player1Name;
        player1El.innerText = player1Name;
        currentPlayer = 0;
    }
    else{
        player2El.style.color = randomColor();
        player2Name = "*"+ player2Name;
        player2El.innerText = player2Name;
        currentPlayer = 1;
    }
}

function resetActivePlayerScore(){
    if(currentPlayer){
        player2El.style.color = 'white';
        player2El.innerText = 'Player2:';
    }
    else{
        player1El.style.color = 'white';
        player1El.innerText = 'Player1:';
    }
}