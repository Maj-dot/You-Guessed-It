/*----- constants -----*/
const maxGuesses = 6;

/*----- state variables -----*/
let wordsToGuess = ["Nike", "Jordan", "Adidas", "Converse", "Puma", "Vans", "Yeezy", "NewBalance", "Saucony", "ASICS"];
let currentWord = '';
let guessedLetters = [];
let incorrectGuesses = 0;
let gameOver = false;
let score = 0;
let wordIndex = 0;
let shuffledWords = shuffleWords([...wordsToGuess]);
let currentImageIndex = 0;
const imagePaths = [
    './images/img1.webp',
    './images/img2.webp',
    './images/img3.webp',
    './images/img4.webp',
    './images/img5.webp',
    './images/img6.webp',
    './images/img7.webp',
    './images/img8.webp',
    './images/img9.webp',
    './images/youWin.webp',
];
/*----- cached elements  -----*/
const wordDisplayArea = document.getElementById('wordDisplayArea');
const keyBoardButtons = document.querySelectorAll('.row button');
const scoreDisplay = document.getElementById('scoreDisplay');
const incorrectGuessesDisplay = document.getElementById('incorrectGuessesDisplay');
const newGameButton = document.getElementById('newGameButton');
const messageDisplay = document.getElementById('messageDisplay');
const instructionModal = document.getElementById('instructionModal');
const closeButton = document.querySelector('.close-button');
const playNowButton = document.getElementById('playNowButton');
const winImage = document.getElementById('win-image');
/*----- event listeners -----*/
if (playNowButton) playNowButton.addEventListener('click', startGame);
if (closeButton) closeButton.addEventListener('click', startGame);
if (newGameButton) newGameButton.addEventListener('click', startNewGame);
keyBoardButtons.forEach(button => {
    button.addEventListener('click', handleGuess);
});
document.addEventListener('DOMContentLoaded', function () {
    showInstructions();
});

/*----- functions -----*/
function showInstructions() {
    instructionModal.style.display = 'block';
};

function closeInstructions() {
    instructionModal.style.display = 'none';
};

function startNewGame() {
    resetImages();
    score = 0;
    initGame();
};

function startGame() {
    closeInstructions();
    initGame();
};

function shuffleWords(words) {
    for (let i = words.length - 1; i > 0; i--) {
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
};

function initGame() {
    currentWord = getRandomWord();
    guessedLetters = [];
    incorrectGuesses = 0;
    gameOver = false;
    messageDisplay.textContent = '';
    updateDisplay();
};

function updateDisplay() {
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
    incorrectGuessesDisplay.innerText = incorrectGuesses;
};

function renderScore() {
    scoreDisplay.innerText = score;
};

function handleGuess(event) {
    if (gameOver) return;
    let guessedLetter = event.target.value.toUpperCase();
    if (!guessedLetters.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        if (currentWord.includes(guessedLetter)) {
            if (currentWord.split('').every(letter => guessedLetters.includes(letter))) {
                score++;
                gameOver = false;
                if (wordIndex >= shuffledWords.length) {
                    messageDisplay.textContent = "NOLA PHONE HOME! 🚀";
                    displayFinalWinImage();
                } else {
                    messageDisplay.textContent = "Let's Goooo! Level Up!🚀";
                    setTimeout(newWord, 4000);
                    displayNextWinImage();
                }
            }
        } else {
            incorrectGuesses++;
            if (incorrectGuesses >= maxGuesses) {
                gameOver = true;
                messageDisplay.textContent = `Womp Womp!🥴 Sorry The Correct Word Was ${currentWord}. Start A Game!`;
                showLossImage();
                setTimeout(initGame, 4000);
            } else {
                messageDisplay.textContent = "Incorrect Guess! Try Again.";
            }
        }
    }
    updateDisplay();
};

function displayFinalWinImage() {
    const winImage = document.getElementById('win-image');
    const winImageContainer = document.getElementById('win-images-container');
    if (winImage && winImageContainer) {
        winImage.src = './images/youWin.webp';
        winImageContainer.style.display = 'block';
        winImage.style.display = 'block';
    }
};

function displayNextWinImage() {
    const winImage = document.getElementById('win-image');
    const winImageContainer = document.getElementById('win-images-container');

    if (winImage && winImageContainer) {
        if (currentImageIndex < imagePaths.length) {
            winImage.src = imagePaths[currentImageIndex];
            winImageContainer.style.display = 'block';
            winImage.style.display = 'block';
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
            winImage.src = imagePaths[currentImageIndex];
            winImageContainer.style.display = 'block';
            winImage.style.display = 'block';
        }
    }
};

function displayIncorrectGuessImage() {
    const winImage = document.getElementById('win-image');
    const winImageContainer = document.getElementById('win-images-container');
    if (winImage && winImageContainer) {
        winImage.src = '/images/youLost.webp';
        winImageContainer.style.display = 'block';
        winImage.style.display = 'block';
    }
};


function showLossImage() {
    const lossImageContainer = document.getElementById('lossImageContainer');
    const lossImage = document.getElementById('lossImage');

    if (lossImage) {
        lossImage.src = './images/youLost.webp';
        lossImageContainer.style.display = 'block';
        setTimeout(() => {
            lossImageContainer.style.display = 'none';
            initGame();
        }, 4000);
    }
};

function resetImages() {
    const winImage = document.getElementById('win-image');
    const winImageContainer = document.getElementById('win-images-container');
    if (winImage && winImageContainer) {
        winImage.src = '';
        winImageContainer.style.display = 'none';
        winImage.style.display = 'none';
    }
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
        button.disabled = guessedLetters.includes(letter);
        if (button.disabled) {
            button.classList.add('clicked');
        } else {
            button.classList.remove('clicked');
        }
    });
};