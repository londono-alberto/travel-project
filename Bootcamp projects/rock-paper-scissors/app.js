// set initial player/computer scores
let playerScore = 0;
let computerScore = 0;

let playerSelection;
let computerSelection;

function getComputerSelection () {
    let computerNumber = random(3);
    let computerGuess = '' ;

    switch (computerNumber) {
        case 1:
            computerGuess = 'Rock';
            break;
        case 2:
            computerGuess = 'Paper';
            break;
        case 3:
            computerGuess = 'Scissors';
            break;
            default:
            break;
    }

    return computerGuess;
        }

    function playRound(playerSelection, computerSelection) {
    let log = '';

    if (playerSelection === 'Rock') {
        if (computerSelection === 'Paper') {
            log = 'You Lose! Paper beats Rock';

}   else if (computerSelection === 'Scissors') {
        log = 'You Win! Rock beats Scissors';

}   else {
    log = "It's a tie";
}

}   else if (playerSelection === 'Paper') {
    if (computerSelection === 'Scissors') {
    log = 'You Lose! Scissors beats Paper';

}    else if (computerSelection === 'Rock') {
    log = 'You Win! Paper beats Rock';

}   else {
    log = "It's a tie";
}

    } else if (playerSelection === 'Scissors') {
    if (computerSelection === 'Rock') {
    log = 'You Lose! Rock beats Scissors';

}    else if (computerSelection === 'Paper') {
    log = 'You Win! Scissors beats Paper';
    } else {
    log = "It's a tie";
    }
}

    return log;
}

function createParagWithText(text) {
    const p = document.createElement('p');
    p.textContent = text;

    return p;
}

function game(playerSelect) {
    let playerSelection = capitalize(playerSelect);
    let computerSelection = getComputerSelection();

    let roundResult = playRound(playerSelection, computerSelection);

    if (roundResult.search('You Win!') > -1) {
    playerScore++;
    } else if (roundResult.search('You Lose!') > -1) {
    computerScore++;
    }

    scorePlayer.textContent = playerScore;
    scoreComputer.textContent = computerScore;
    message.textContent = roundResult;
    selectionPlayer.appendChild(createParagWithText(playerSelection));
    selectionComputer.appendChild(createParagWithText(computerSelection));

    if (playerScore >= 5 && computerScore < 5) {
        message.textContent = 'Game Over. You Win!';
    } else if (playerScore < 5 && computerScore >= 5) {
        message.textContent = 'Game Over. You Lose!';
    }
}