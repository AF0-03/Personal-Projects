// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');

const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function()
{
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}


// Starting Conditions
const init = function()
{
    scores = [0 , 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;

    diceEl.classList.add("hidden");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
}

init();

// Rolling the functionality 
btnRoll.addEventListener('click', function()
{
    if(playing)
    {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `Images/dice-${dice}.png`;

        // 3. Check if the player rolled 1
        if(dice !== 1)
        {
            // Add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else
        {
            switchPlayer();
        }  
    }
});

btnHold.addEventListener('click', function()
{
    if(playing)
    {
        // 1. Add current score to active player score
        scores[activePlayer] += currentScore;
        // scores[1] = currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // 2. Check is player's score is >= 100
        if(scores[activePlayer] >= 100)
        {
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        }
        else
        {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);