const cardGrid = document.getElementById('card-grid');
const moveCount = document.getElementById('move-count');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');

let cardSymbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍍', '🍑'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let timeElapsed = 0;
let gameStarted = false;

// Double the symbols to create pairs
cardSymbols = [...cardSymbols, ...cardSymbols];

// Shuffle the card symbols
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Initialize the game
function initializeGame() {
    cardGrid.innerHTML = '';
    shuffle(cardSymbols);
    cards = [];
    matchedPairs = 0;
    moves = 0;
    moveCount.textContent = moves;
    gameStarted = false;
    clearInterval(timer);
    timeElapsed = 0;
    timerDisplay.textContent = '00:00';
    flippedCards = [];

    cardSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, symbol));
        cardGrid.appendChild(card);
        cards.push(card);
    });
}

// Flip card logic
function flipCard(card, symbol) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push({ card, symbol });
        if (flippedCards.length === 2) {
            moves++;
            moveCount.textContent = moves;
            checkForMatch();
        }
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.symbol === card2.symbol) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardSymbols.length / 2) {
            setTimeout(() => alert('You won!'), 300);
            clearInterval(timer);
        }
    } else {
        setTimeout(() => {
            card1.card.classList.remove('flipped');
            card2.card.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Timer logic
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
        const seconds = (timeElapsed % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

// Restart game
restartButton.addEventListener('click', initializeGame);

// Start the game on page load
initializeGame();
