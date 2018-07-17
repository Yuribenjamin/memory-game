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
const stars = document.querySelector('.stars');
stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                   <li><i class="fa fa-star"></i></li>
                   <li><i class="fa fa-star"></i></li>`;
/*
 * Create a list that holds all of your cards
 */
const cards = [ 'fa-music', 'fa-music',
                'fa-space-shuttle', 'fa-space-shuttle',
                'fa-terminal', 'fa-terminal',
                'fa-code', 'fa-code',
                'fa-headphones', 'fa-headphones',
                'fa-bug', 'fa-bug',
                'fa-magic', 'fa-magic',
                'fa-rocket', 'fa-rocket'


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
    gameOver();
    gameWon();
}

restartBtn.addEventListener('click', function(){
    resetGame();
});

function resetVal(){
    cardsBox.innerHTML = '';
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                       <li><i class="fa fa-star"></i></li>
                       <li><i class="fa fa-star"></i></li>`;
    totalSeconds = 0;
    timerContainers.innerHTML = totalSeconds;
    stopTimer();
    firstClick = true;
}

function resetGame() {
    resetVal();
    init();
}

function addmoves() {
    moves++;
    movesContainer.innerHTML = moves;
    starRating();
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

function starRating() {
    switch (moves) {
        case 18:
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                           <li><i class="fa fa-star"></i></li>`;
        break;
        case 25:
        stars.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        break;
    }
}

function gameOver() {
    if(moves >= 40) {
        alert ('Game Over');
        resetGame();
    }
}

function modal() {
    const modal = document.getElementById('endGame');
    modal.classList.add('appear');
    
}

function gameWon() {
    if(matchedCards.length == cards.length) {
        clearInterval(liveTimer);
        modal();


        let modalMoves = document.querySelector('.modal-moves');
        modalMoves.innerHTML = `Moves : ${moves}`;
        const time = document.querySelector('.modal-time');
	    time.innerHTML = `Total Seconds : ${totalSeconds}`;
        const playAgain = document.querySelector('.button');
        playAgain.addEventListener('click', function() {
        resetGame();
        const modal = document.getElementById('endGame');
        modal.classList.remove('appear');
        
    }); 
    }
}