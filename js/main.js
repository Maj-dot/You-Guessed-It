/*----- constants -----*/
const maxGuesses = 6; // Maxium number of incorrect guesses
 
/*----- state variables -----*/
let wordToGuess = ["Nike", "Jordan", "Adidas", "Converse", "Puma", "Vans", "New Balance", "Reebok", "Saucony", "ASICS"];
let sneaker = []; //Guessed Letters
let incorrectGuesses = 0;
let gameOver = false;
/*----- cached elements  -----*/
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButtons = document.querySelectorAll('.row');
const scoreDisplay =  document.getElementById('scoreDisplay');
const resetButton = document.getElementById('resetButton');
const playButton = document.getElementById('playButton');

/*----- event listeners -----*/
resetButton.addEventListener('click', () => {
    console.log('resetButton clicked!');
});

newGameButton.addEventListener('click', () => {
    console.log('newGameButton clicked!');
});

playButton.addEventListener('click', () => {
    console.log('playButton clicked!');
});

keyBoardButtons.forEach(keyBoardButton => {
    keyBoardButton.addEventListener('click', () => {
        console.log('keyboardButton clicked!');
    });
});





/*----- functions -----*/
// A function to get a random word from the wordToGuess array
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordToGuess.length);
    return wordToGuess[randomIndex];
}

function initGame() {
   const randomWord = getRandomWord(); // Function to get a random word
   console.log('Random word selected:', randomWord);
}

