/*----- constants -----*/
const maxGuesses = 6; // Maxium number of incorrect guesses

/*----- state variables -----*/
let wordToGuess; // Word for player to guess
let spaceMan = []; //Guessed Letters
let incorrectGuesses = 0;
let gameOver = false;
/*----- cached elements  -----*/
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButton = document.getElementById('keyBoardButton');
const scoreDisplay =  document.getElementById('scoreDisplay');
const resetButton = document.getElementById('resetButton');

/*----- event listeners -----*/


/*----- functions -----*/