
function switchActivePlayerScore(){
    var player1El = document.getElementById('p1');
    var player2El = document.getElementById('p2');
    // console.log('playerOneEl: '+player1El);
    var player1Name = player1El.innerText;
    var player2Name = player2El.innerText;
    if(currentPlayer){
        player2Name = 'Player2:';
        player1Name = "*"+ player1Name;
        player1El.innerText = player1Name;
        currentPlayer = 0;
    }
    else{
        player1Name = 'Player1:';
        player2Name = "*"+ player2Name;
        player2El.innerText = player2Name;
        currentPlayer = 1;
    }
}