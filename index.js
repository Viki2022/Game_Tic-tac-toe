// Introduce const and let
const playSquare = document.querySelector('.square');
const playCells = document.querySelectorAll('.cell');
const currentState = document.querySelector('.current-state');
const button = document.querySelector('.button');
const playerOneScoreCard = document.querySelector('.score-player-one');
const playerTwoScoreCard = document.querySelector('.score-player-two');
let playerOneScore = 0;
let playerTwoScore = 0;
let progress = 0;
let player = 'X';
let result = '';
const winOption = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
    [0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// Track cell clicks. Player X always goes first 
function startGame(event) {
	if(event.target.className = 'cell') {
		if(progress % 2 === 0) {
		event.target.innerHTML = 'X';
		} else {
		 event.target.innerHTML = 'O';
		}
		progress++;
		changePlayer();
		checkWin();
	 }
}
playSquare.addEventListener('click', startGame);

// Show who goes next
const playerTurn = () => `Player ${player} turn`;
currentState.innerHTML = playerTurn();

function changePlayer() {
    player = player === 'X' ? 'O' : 'X';
    currentState.innerHTML = playerTurn();
}

// Find the winner and update the score
const checkWin = () => {
	for(i = 0; i < winOption.length; i++) {
		if(playCells[winOption[i][0]].innerHTML == 'X' && playCells[winOption[i][1]].innerHTML == 'X' && playCells[winOption[i][2]].innerHTML == 'X') { 
			result = 'Player X';
			showWinner(result);
			playSquare.removeEventListener('click', startGame);
			playerOneScoreCard.innerHTML = ++playerOneScore;
		} else if(playCells[winOption[i][0]].innerHTML == 'O' && playCells[winOption[i][1]].innerHTML == 'O' && playCells[winOption[i][2]].innerHTML == 'O') { 
			result = 'Player O';
			showWinner(result);
			playSquare.removeEventListener('click', startGame);
			playerTwoScoreCard.innerHTML = ++playerTwoScore;
		} if(progress == 9) {
			result = 'Draw';
			showDraw(result);
			playSquare.removeEventListener('click', startGame);
      	}
    }
}

// Show the result and add music
const audio = new Audio()
const showWinner = winner => {
    currentState.innerHTML = `${winner} won the game!`;
	audio.src = 'assets/sound_of_victory.mp3';
	audio.play();
}

const showDraw = () => {
    currentState.innerHTML = `The game ended in a draw!`;
	audio.src = 'assets/draw.mp3';
	audio.play();
}

// Remove and start the game again
button.addEventListener('click', () => {
   location.reload();
});