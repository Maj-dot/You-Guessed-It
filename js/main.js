/*----- constants -----*/
const maxGuesses = 6; // Maxium number of incorrect guesses
 
/*----- state variables -----*/
let wordToGuess = ["Nike", "Jordan", "Adidas", "Converse", "Puma", "Vans", "New Balance", "Reebok", "Saucony", "ASICS"];
let currentWord = '';
let sneaker = []; //Guessed Letters
let incorrectGuesses = 0;
let gameOver = false;
let score = 0;

/*----- cached elements  -----*/
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButtons = document.querySelectorAll('.row');
const scoreDisplay =  document.getElementById('scoreDisplay');
const incorrectGuessesDisplay = document.getElementById('incorrectGuessesDisplay')
const resetButton = document.getElementById('resetButton');
const newGameButton = document.getElementById('newGameButton');

/*----- event listeners -----*/
resetButton.addEventListener('click', resetGame);

newGameButton.addEventListener('click', initGame);

keyBoardButtons.forEach(keyBoardButton => {
    keyBoardButton.addEventListener('click', handleGuess);
});

/*----- functions -----*/
// A function to get a random word from the wordToGuess array
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordToGuess.length);
    return wordToGuess[randomIndex].toUpperCase();
}

function initGame() {
   const randomWord = getRandomWord(); // Call function to get a random word
   //console.log(randomWord);
   sneaker = []; 
   incorrectGuesses = 0;
   gameOver = false;
   score = 0;
   updateDisplay();
};

function resetGame() {
    sneaker = [];
    incorrectGuesses = 0;
    gameOver = false;
    score = 0;
    updateDisplay();
};

function updateDisplay () {
    renderWordDisplay();
    renderIncorrectGuesses();
    renderScore();
    renderkeyboardButtons();
};

function renderWordDisplay() {}

function renderIncorrectGuesses() {}

function renderScore() {}

function keyBoardButtons() {}