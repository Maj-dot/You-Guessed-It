/*----- constants -----*/
const maxGuesses = 6; 
 
/*----- state variables -----*/
let wordsToGuess = ["Nike", "Jordan", "Adidas", "Converse", "Puma", "Vans", "Yeezys", "NewBalance", "Saucony", "ASICS"];
let currentWord = '';
let guessedLetters = []; //Guessed Letters
let incorrectGuesses = 0;
let gameOver = false;
let score = 0;
let wordIndex = 0;
let shuffledWords = shuffleWords([...wordsToGuess]);
/*----- cached elements  -----*/
const playNowButton = document.getElementById('playNowButton');
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButtons = document.querySelectorAll('.row button');
const scoreDisplay =  document.getElementById('scoreDisplay');
const incorrectGuessesDisplay = document.getElementById('incorrectGuessesDisplay')
const newGameButton = document.getElementById('newGameButton');
const messageDisplay = document.getElementById('messageDisplay');
const instructionModal = document.getElementById('instructionModal');
const closeButton = document.querySelector('.close-button');
/*----- event listeners -----*/
if (playNowButton) playNowButton.addEventListener('click', initGame);
if (closeButton) closeButton.addEventListener('click', closeInstructions);
if (newGameButton) newGameButton.addEventListener('click', startNewGame);
keyBoardButtons.forEach(button => {
    button.addEventListener('click', handleGuess);
});
document.addEventListener('DOMContentLoaded', showInstructions);

/*----- functions -----*/
function showInstructions() {
    instructionModal.style.display = 'block';
};

function closeInstructions() {
    instructionModal.style.display = 'none';
}

function shuffleWords(words) {
    for (let i = words.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
};

function getRandomWord() {
    if (wordIndex >= shuffledWords.length) {
        wordIndex = 0;
        shuffledWords = shuffleWords([...wordsToGuess]);
    }
    return shuffledWords[wordIndex++].toUpperCase();
}

function initGame() {
   currentWord = getRandomWord();
   guessedLetters = []; 
   incorrectGuesses = 0;
   gameOver = false;
   messageDisplay.textContent = '';
   updateDisplay();
   closeInstructions();
};


function startNewGame() {
    score = 0;
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