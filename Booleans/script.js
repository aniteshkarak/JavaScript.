const moves = ["rock", "paper", "scissors"];

function getComputerMove() {
  return moves[Math.floor(Math.random() * moves.length)];
}

function determineWinner(playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "Tie";
  }

  if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    return "Player wins";
  }

  return "Computer wins";
}

function playRockPaperScissors(playerMove) {
  const normalizedMove = playerMove.toLowerCase();
  if (!moves.includes(normalizedMove)) {
    return "Invalid move. Choose rock, paper, or scissors.";
  }

  const computerMove = getComputerMove();
  const result = determineWinner(normalizedMove, computerMove);

  return `Player: ${normalizedMove}, Computer: ${computerMove} -> ${result}`;
}

// Example usage:
console.log(playRockPaperScissors("rock"));
console.log(playRockPaperScissors("paper"));
console.log(playRockPaperScissors("scissors"));
