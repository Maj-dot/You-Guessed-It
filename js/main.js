/*----- constants -----*/
const maxGuesses = 6; 
 
/*----- state variables -----*/
let wordsToGuess = ["Nike", "Jordan", "Adidas", "Converse", "Puma", "Vans", "NewBalance", "Reebok", "Saucony", "ASICS"];
let currentWord = '';
let guessedLetters = []; //Guessed Letters
let incorrectGuesses = 0;
let gameOver = false;
let score = 0;
let wordIndex = 0;
let shuffledWords = shuffledWords([...wordsToGuess]);

/*----- cached elements  -----*/
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButtons = document.querySelectorAll('.row button');
const scoreDisplay =  document.getElementById('scoreDisplay');
const incorrectGuessesDisplay = document.getElementById('incorrectGuessesDisplay')
const newGameButton = document.getElementById('newGameButton');
const messageDisplay = document.getElementById('messageDisplay');
/*----- event listeners -----*/
newGameButton.addEventListener('click', initGame);
keyBoardButtons.forEach(button => {
    button.addEventListener('click', handleGuess);
});
document.addEventListener('DOMContentLoaded', initGame);
/*----- functions -----*/
function shuffleWords(words) {
    for (let i = words.length - 1; i > 0; i--){
        const j = math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
}


function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsToGuess.length);
    return wordsToGuess[randomIndex].toUpperCase();
}

function initGame() {
   currentWord = getRandomWord();
   guessedLetters = []; 
   incorrectGuesses = 0;
   score = '';
   gameOver = false;
   messageDisplay.textContent = '';
   updateDisplay();
};

function startNewGame() {
    initGame();
};

function updateDisplay () {
    renderWordDisplay();
    renderIncorrectGuesses();
    renderScore();
    renderkeyBoardButtons();
};

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
 
function renderIncorrectGuesses() {
    incorrectGuessesDisplay.textContent = `Incorrect Guesses: ${incorrectGuesses}`;
};

function renderScore() {
    scoreDisplay.textContent =`Score: ${score}`;
};

function handleGuess(event) {
    if(gameOver) return;
    let guessedLetter = event.target.value.toUpperCase();
    if (!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        if(currentWord.includes(guessedLetter)) {
            if (currentWord.split('').every(letter => guessedLetters.includes(letter))) {
                score++;
                gameOver = false;
                messageDisplay.textContent = "Let's Goooo! Level Up!🚀";
                setTimeout(newWord, 4000);
            }
        } else {
            incorrectGuesses++;
            if (incorrectGuesses >= maxGuesses) {
                gameOver = true; 
                messageDisplay.textContent = `Womp Womp!🥴 Sorry The Correct Word Was ${currentWord}. Start A Game!`;
                setTimeout(initGame, 4000);
            }
        }
    }
    updateDisplay();
};

function newWord() {
    currentWord = getRandomWord();
    guessedLetters = [];
    incorrectGuesses = 0;
    gameOver = false;
    messageDisplay.textContent = '';
    updateDisplay();
};


function renderkeyBoardButtons() {
    keyBoardButtons.forEach(button => {
        let letter = button.value.toUpperCase();
        if (guessedLetters.includes(letter)) {
            button.disabled = true; 
        } else {
            button.disabled = false;
        }
    });
};