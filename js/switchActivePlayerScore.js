var player1El = document.getElementById('p1');
var player2El = document.getElementById('p2');
    // console.log('playerOneEl: '+player1El);

function switchActivePlayerScore(){
    resetActivePlayerScore();
    var player1Name = player1El.innerText;
    var player2Name = player2El.innerText;
    if(currentPlayer){
        
        //reset opposite player
        player1Name = "*"+ player1Name;
        player1El.innerText = player1Name;
        currentPlayer = 0;
    }
    else{
        //reset opposite player
        player2Name = "*"+ player2Name;
        player2El.innerText = player2Name;
        currentPlayer = 1;
    }
}

function resetActivePlayerScore(){
    if(currentPlayer){
        player2El.innerText = 'Player2:';
        console.log('resetActivePlayerScore player2El.innerText '+ player2El.innerText)
    }
    else{
        player1El.innerText = 'Player1:';
        console.log('resetActivePlayerScore player1El.innerText '+ player1El.innerText)
    }
}