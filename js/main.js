/*----- constants -----*/
const maxGuesses = 6; // Maxium number of incorrect guesses

/*----- state variables -----*/
let wordToGuess; // Word for player to guess
let sneaker = []; //Guessed Letters
let incorrectGuesses = 0;
let gameOver = false;
/*----- cached elements  -----*/
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButtons = document.querySelectorAll('.row');
const scoreDisplay =  document.getElementById('scoreDisplay');
const resetButton = document.getElementById('resetButton');
const newGameButton = document.getElementById('newGameButton');

/*----- event listeners -----*/
resetButton.addEventListener('click', () => {
    console.log('resetButton clicked!');
});



keyBoardButtons.forEach(keyBoardButton => {
    keyBoardButton.addEventListener('click', () => {
        console.log('keyboardButton clicked!');
    });
});

/*----- functions -----*/
function initGame() {
    //will add more code later
};

function renderGameState() {
    //will add more code later
};