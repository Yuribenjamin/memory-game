// Declare Global variables
const cardsBox = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];
const restartBtn = document.querySelector('.restart');
let moves = 0;
const movesContainer = document.querySelector('.moves');
movesContainer.innerHTML = 0;
const timerContainers = document.querySelector('.timer');
let liveTimer, totalSeconds = 0;
timerContainers.innerHTML = totalSeconds;
firstClick = true;
/*
 * Create a list that holds all of your cards
 */
const cards = [ 'fa-diamond', 'fa-diamond',
                'fa-paper-plane-o', 'fa-paper-plane-o',
                'fa-anchor', 'fa-anchor',
                'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube',
                'fa-leaf', 'fa-leaf',
                'fa-bicycle', 'fa-bicycle',
                'fa-bomb', 'fa-bomb'


];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function init () {
    const icons = shuffle(cards);
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="fa ${icons[i]}"></i>`;
        cardsBox.appendChild(card);
        click(card);
    }
}
init();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function click(card) {
    card.addEventListener('click', function(){
        if(firstClick){
            startTimer();
            firstClick = false;
        }
        const currentCard = this;
        const previousCard = openCards[0];

        if(openCards.length === 1) {
            card.classList.add('open', 'show', 'disable');
            openCards.push(this);
            compareCards(currentCard, previousCard);
        }else {
            card.classList.add('open', 'show', 'disable');
            openCards.push(this);
        }
    });
}

function compareCards (currentCard, previousCard) {
    if(currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add('match');
        previousCard.classList.add('match');
        matchedCards.push(currentCard,previousCard);
        openCards = [];

    }else {
        setTimeout(function(){
            currentCard.classList.remove('open', 'show', 'disable');
            previousCard.classList.remove('open', 'show', 'disable');
        },300);
        openCards = [];
    }
    addmoves();
}

restartBtn.addEventListener('click', function(){
    // delete cards
    cardsBox.innerHTML = '';

    //invoke init to generate cards
    init();

    //reset any related variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;

    // reset timer
    totalSeconds = 0;
    timerContainers.innerHTML = totalSeconds;

});

function addmoves() {
    moves++;
    movesContainer.innerHTML = moves;
}

function startTimer() {
    liveTimer = setInterval(function(){
        totalSeconds++;
        timerContainers.innerHTML = totalSeconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}