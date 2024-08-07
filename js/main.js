/*----- constants -----*/
const maxGuesses = 6; // Maxium number of incorrect guesses
 
/*----- state variables -----*/
let wordsToGuess = ["Nike", "Jordan", "Adidas", "Converse", "Puma", "Vans", "New Balance", "Reebok", "Saucony", "ASICS"];
let currentWord = '';
let guessedLetters = []; //Guessed Letters
let incorrectGuesses = 0;
let gameOver = false;
let score = 0;

/*----- cached elements  -----*/
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButtons = document.querySelectorAll('.row button');
const scoreDisplay =  document.getElementById('scoreDisplay');
const incorrectGuessesDisplay = document.getElementById('incorrectGuessesDisplay')
const resetButton = document.getElementById('resetButton');
const newGameButton = document.getElementById('newGameButton');
const messageDisplay = document.getElementById('messageDisplay');
/*----- event listeners -----*/
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', initGame);
keyBoardButtons.forEach(button => {
    button.addEventListener('click', handleGuess);
});
document.addEventListener('DOMContentLoaded', initGame);
/*----- functions -----*/
// A function to get a random word from the wordToGuess array
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsToGuess.length);
    return wordsToGuess[randomIndex].toUpperCase();
}

function initGame() {
   currentWord = getRandomWord();
   guessedLetters = []; 
   incorrectGuesses = 0;
   gameOver = false;
   messageDisplay.textContent = '';
   updateDisplay();
};

function startNewGame() {
    score = 0;
    resetGame();
}

function resetGame() {
    guessedLetters = [];
    incorrectGuesses = 0;
    gameOver = false;
    messageDisplay.textContent = '';
    initGame();
};

function updateDisplay () {
    renderWordDisplay();
    renderIncorrectGuesses();
    renderScore();
    renderkeyBoardButtons();
};

//Display the blanks for unguessed letters in the word to guess
function renderWordDisplay() {
    let displayWord = '';
    for (let letter of currentWord) {
        if (guessedLetters.includes(letter)) {
            displayWord += letter + '';
        } else {
            displayWord += '_ ';
        }
    }
    wordDisplayArea.textContent = displayWord.trim();
};

//Display number of incorrect guesses made 
function renderIncorrectGuesses() {
    incorrectGuessesDisplay.textContent = `Incorrect Guesses: ${incorrectGuesses}`;
};

//Show the current score
function renderScore() {
    scoreDisplay.textContent =`Score: ${score}`;
};

//handle letter guesses and update the game state
function handleGuess(event) {
    if(gameOver) return;
    let guessedLetter = event.target.value.toUpperCase();
    if (!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        if(currentWord.includes(guessedLetter)) {
            if (currentWord.split('').every(letter => guessedLetters.includes(letter))) {
                score++;
                gameOver = true;
                messageDisplay.textContent = "Let's Goooo! You Won! Level Up!";
                setTimeout(newWord, 2000);
            }
        } else {
            incorrectGuesses++;
            if (incorrectGuesses >= maxGuesses) {
                gameOver = true; 
                messageDisplay.textContent = `Womp Womp! Sorry The Correct Word Was ${currentWord}. Starting A Game!`;
                setTimeout(initGame, 2000);
            }
        }
    }
    updateDisplay();
}

function newWord() {
    currentWord = getRandomWord();
    guessedLetters = [];
    incorrectGuesses = 0;
    gameOver = false;
    messageDisplay.textContent = '';
    updateDisplay();
}

//Update the keyboard based on guesses 
function renderkeyBoardButtons() {
    keyBoardButtons.forEach(button => {
        let letter = button.value.toUpperCase();
        if (guessedLetters.includes(letter)) {
            button.disabled = true; 
        } else {
            button.disabled = false;
        }
    });
}