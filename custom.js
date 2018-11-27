var scores, activePlayer, rndDice, currentScore, rndPlayer, players, gameStatus, rollBtn, holdBtn, newGameBtn, dice, userInput, scoreBtn, lastRndDice;

init();

/*=======================================================
                    ROLL DICE BUTTON
=========================================================*/
$('.roll-btn').click(function () {
    if (gameStatus) {

        //after every click random number must be generated
        rndDice = Math.floor(Math.random() * 6) + 1;

        $('.dices-section').css('visibility', 'visible').hide().fadeIn('fast');

        //generating random file number
        $('.dice').attr('src', 'dice-' + rndDice + '.png');

        //if player rolls 6 two times in a row total amount of points will be reseted
        if (rndDice === 6 && lastRndDice === 6) {
            scores[activePlayer] = 0;
            $('#score-' + activePlayer).text(0);
            switchPlayers();
        }
        if (rndDice !== 1) {
            //update current score
            currentScore += rndDice;
            $('#current-' + activePlayer).text(currentScore);
        } else {
            switchPlayers();
        }
        //storing random number for next roll
        lastRndDice = rndDice;
    }
});

/*=======================================================
                    HOLD BUTTON
=========================================================*/
$('.hold-btn').click(function () {
    if (gameStatus) {
        scores[activePlayer] += currentScore;
        $('#score-' + activePlayer).text(scores[activePlayer]);

        if (scores[activePlayer] >= userInput) {
            //assign winner
            $('#player-' + activePlayer).text('Winner!');

            $('#player-' + activePlayer).addClass('winner');
            gameStatus = false;
        } else {
            //switch player
            switchPlayers();
        }
    }
});

/*=======================================================
                    NEW GAME BUTTON
=========================================================*/
$('.new-game-btn').click(init);

/*=======================================================
                    CONFIRM SCORE LIMIT BUTTON
=========================================================*/
scoreBtn = document.querySelector('.confirm');
scoreBtn.addEventListener('click', function () {
    //check input field
    userInput = document.querySelector('.user-input').value;
    
    //Undefined, 0, null or "" are COERCED to false
    //Anything else is COERCED to true
    if (userInput && !isNaN(userInput)) {
        buttonStatus(false);
    }
});

/*=======================================================
                    FUNCTIONS
=========================================================*/
/*
initialization function 
- setting scores to 0
- random player starts the game
*/
function init() {

    buttonStatus(true);

    players = [
        $('.game-content__player-0'),
        $('.game-content__player-1')
    ];

    scores = [0, 0];
    activePlayer = Math.round(Math.random()); //random 0 or 1
    currentScore = 0;
    gameStatus = true;

    //at the beginning of the game choose random player and assign active class
    //after NEW GAME BTN click prevent active class duplicate
    if (activePlayer === 0) {
        players[0].addClass('active-0');
        players[1].removeClass('active-1');
    } else {
        players[1].addClass('active-1');
        players[0].removeClass('active-0');
    }

    //after the game is loaded DICE is invisible
    $('.dices-section').css('visibility', 'hidden');

    //setting scores (final & current) to 0 
    $('#score-0').text(0);
    $('#score-1').text(0);

    $('#current-0').text(0);
    $('#current-1').text(0);

    //Removing winner class and changing Player 1 & 2 text content
    $('#player-0').removeClass('winner');
    $('#player-1').removeClass('winner');

    $('#player-0').text('Player 1');
    $('#player-1').text('Player 2');
}

//function which enables or disables buttons
function buttonStatus(condition) {
    $('.hold-btn').prop('disabled', condition);
    $('.roll-btn').prop('disabled', condition);
}

//function which changes player turn
function switchPlayers() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;

    $('#current-0').text(0);
    $('#current-1').text(0);

    $('.game-content__player-0').toggleClass('active-0');
    $('.game-content__player-1').toggleClass('active-1');
}