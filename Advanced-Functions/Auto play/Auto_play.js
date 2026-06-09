const scores = JSON.parse(localStorage.getItem('scores')) || {
    Wins: 0,
    loses: 0,
    ties: 0
};

document.querySelector('.js-score')
    .innerHTML= `Wins: ${scores.Wins}, Loses: ${scores.loses}, Ties: ${scores.ties}`;


let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    const autoPlayButton = document.getElementById('auto-play-btn');

    if(!isAutoPlaying){
        intervalId = setInterval(function() {
            const playerMove = pickComputerMove();
            playgame(playerMove);
        }, 1000);
        isAutoPlaying = true;

        autoPlayButton.style.backgroundColor = 'rgba(255, 0, 0, 0.514)';
        autoPlayButton.textContent = 'Stop Auto Play';
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying = false;

        autoPlayButton.style.backgroundColor = 'rgba(0, 255, 0, 0.514)';
        autoPlayButton.textContent = 'Auto Play';
    }

}

function playgame(playerMove) {
    let computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You lose!';
        }
        else if (computerMove === 'Paper') {
            result = 'You win!';
        }
        else if (computerMove === 'Scissors') {
            result = 'It is a tie!';
        }
    }

    if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You win!';
        }
        else if (computerMove === 'Paper') {
            result = 'It is a tie!';
        }
        else if (computerMove === 'Scissors') {
            result = 'You lose!';
        }
    }

    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'It is a tie!';
        }
        else if (computerMove === 'Paper') {
            result = 'You lose!';
        }
        else if (computerMove === 'Scissors') {
             result = 'You win!';
        }
    }

    if(result === 'You win!'){
        scores.Wins += 1;
    }
    else if(result === 'You lose!'){
        scores.loses += 1;
    }
    else if(result === 'It is a tie!'){
        scores.ties += 1;
    }

    localStorage.setItem('scores', JSON.stringify(scores));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove.toLowerCase()}-emoji.png" alt="${playerMove}" class="emoji">, Computer <img src="${computerMove.toLowerCase()}-emoji.png" alt="${computerMove}" class="emoji">`;

            //alert(`Computer chose ${computerMove}. ${result} Wins: ${scores.Wins}, Loses: ${scores.loses}, Ties: ${scores.ties}`);
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${scores.Wins}, Loses: ${scores.loses}, Ties: ${scores.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
    }
    else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}