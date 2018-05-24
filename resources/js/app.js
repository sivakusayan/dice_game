/*-------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------BASIC SETUP----------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

var scores, roundScore, activePlayer, gameState, diceDOM, color, winThreshold, gameMode, dice1, dice2, isFirefox;

dice1 = 0;
dice2 = 0;
diceDOM = document.querySelectorAll('.dice');
color = 'blue';
winThreshold = 100;
gameMode = 1; 

isFirefox = typeof InstallTrigger !== 'undefined';

if (isFirefox) {
    document.querySelector('.blackout').style.background = 'rgba(255, 255, 255, 0)';
}

/*-------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------GAME FUNCTIONS---------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

function newGame() {
    
    if (gameMode === 1) {
        
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        gameState = true;

        diceDOM[0].style.display = 'none';

        document.getElementById('score-0').textContent = 0;
        document.getElementById('score-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('#name-0').textContent = 'Player 1';
        document.querySelector('#name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
    }
    
    if (gameMode === 2) {
        
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        gameState = true;

        diceDOM[0].style.display = 'none';
        diceDOM[1].style.display = 'none';

        document.getElementById('score-0').textContent = 0;
        document.getElementById('score-1').textContent = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('#name-0').textContent = 'Player 1';
        document.querySelector('#name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
    
    }

}

function newTurn() {
    
    if (gameMode === 1) {
        roundScore = 0;
        diceDOM[0].style.display = 'none';
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }
    
    if (gameMode === 2) {
        roundScore = 0;
        diceDOM[0].style.display = 'none';
        diceDOM[1].style.display = 'none';
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }
}

function roll() {
    if (gameState) {
        
        if (gameMode === 1) {
            dice1 = Math.ceil(Math.random() * 6);
            diceDOM[0].style.display = 'block';
            document.querySelector('.dice1').src = 'resources/img/dice_' + color + '/dice-' + dice1 + '.png';

            if (dice1 !== 1) {
                roundScore += dice1;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            } else {
                newTurn();
            }
        }
        
        if (gameMode === 2) {
            dice1 = Math.ceil(Math.random() * 6);
            dice2 = Math.ceil(Math.random() * 6);
            diceDOM[0].style.display = 'block';
            diceDOM[1].style.display = 'block';
            document.querySelector('.dice1').src = 'resources/img/dice_' + color + '/dice-' + dice1 + '.png';
            document.querySelector('.dice2').src = 'resources/img/dice_' + color + '/dice-' + dice2 + '.png';

            if (dice1 !== 1 && dice2 !== 1) {
                roundScore += dice1 + dice2; 
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            } else if (dice1 == 1 && dice2 == 1) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                newTurn();
            } else {
                newTurn();
            }
        }
    }  
}

function hold() {
    if (gameState) {
        
        if (gameMode === 1) {
            scores[activePlayer] += roundScore;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

            if (scores[activePlayer] >= winThreshold) {
                gameState = false;
                roundScore = 0;
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                diceDOM[0].style.display = 'none';
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            } else {
                newTurn();
            }
        }
        
        if (gameMode === 2) {
            scores[activePlayer] += roundScore;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

            if (scores[activePlayer] >= winThreshold) {
                gameState = false;
                roundScore = 0;
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                diceDOM[0].style.display = 'none';
                diceDOM[1].style.display = 'none';
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            } else {
                newTurn();
            }
        }
    }   
}

/*-------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------SETTINGS FUNCTIONS------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

function openSettings () {
    document.getElementById('game-wrapper').style.opacity = 0;
    document.getElementById('game-wrapper').style.visibility = 'hidden';
    
    setTimeout(function() {
        document.getElementById('settings-wrapper').style.opacity = 1;
        document.getElementById('settings-wrapper').style.visibility = 'visible';
    }, 550);
}

function closeSettings() {
    document.getElementById('settings-wrapper').style.opacity = 0;
    document.getElementById('settings-wrapper').style.visibility = 'hidden';
    
    setTimeout(function() {
        document.getElementById('game-wrapper').style.opacity = 1;
        document.getElementById('game-wrapper').style.visibility = 'visible';
    }, 550);  
}

/*-----------------------------MODIFY WIN CONDITION-----------------------------*/

function changePoints() {
    
    if (document.getElementById('pointsField').value !== '' && document.getElementById('pointsField').value > 0) {
        winThreshold = document.getElementById('pointsField').value;
    
        document.getElementById('points').textContent = winThreshold;
        document.getElementById('pointsField').value = '';
        newGame();
    }
}

/*-----------------------------CHANGE THEMES-----------------------------*/

function swapStyleSheets(sheet) {
    document.getElementById('theme').setAttribute('href', sheet);
}

function changeTheme(themeColor) {
    color = themeColor;
    swapStyleSheets('resources/css/style_' + color + '_' + gameMode + '.css');
    
    document.querySelector('.dice1').src = 'resources/img/dice_' + color + '/dice-' + dice1 + '.png';
    document.querySelector('.dice2').src = 'resources/img/dice_' + color + '/dice-' + dice2 + '.png';
    for (var i = 2; i < 5; i++) {
        diceDOM[i].src = 'resources/img/dice_' + color + '/dice-5.png';
    }
}

function fadeThemeWrap(themeColor) {
    if (isFirefox) {
            document.querySelector('.blackout').style.background = 'rgba(255, 255, 255, 1)';     //Hides FOUC when switching themes       
        } else {
            document.querySelector('.blackout').style.background = 'rgba(0, 0, 0, 1)';
        }
    document.getElementById('settings-wrapper').style.opacity = 0;
    document.getElementById('settings-wrapper').style.visibility = 'hidden';
    
    setTimeout(function() {
        changeTheme(themeColor);
    }, 500);
    
    setTimeout(function() {
        if (isFirefox) {
            document.querySelector('.blackout').style.background = 'rgba(255, 255, 255, 0)';      
        } else {
            document.querySelector('.blackout').style.background = 'rgba(0, 0, 0, 0)';  
        }
        document.getElementById('settings-wrapper').style.opacity = 1;
        document.getElementById('settings-wrapper').style.visibility = 'visible';
    }, 600);
}

function changeRed() {
    if (color != 'red') {
        fadeThemeWrap('red');
    }
}

function changeBlue() {
    if (color != 'blue') {
        fadeThemeWrap('blue');
    }
}

function changePurple() {
    if (color != 'purple') {
        fadeThemeWrap('purple');
    }
}

function changeGreen() {
    if (color != 'green') {
        fadeThemeWrap('green');
    }
}


/*-----------------------------GAME MODE SWITCH-----------------------------*/
    
function gameOneDice () {
    gameMode = 1;
    newGame();

    if (isFirefox) {
        document.querySelector('.blackout').style.background = 'rgba(255, 255, 255, 1)';
        document.getElementById('settings-wrapper').style.opacity = 0;
        document.getElementById('settings-wrapper').style.visibility = 'hidden'

        setTimeout(function(){
            swapStyleSheets('resources/css/style_' + color + '_1.css');
            document.querySelector('.btn-onedice').style.opacity = 0;
            document.querySelector('.btn-onedice').style.visibility = 'hidden';
            document.querySelector('.btn-twodice').style.opacity = 1;
            document.querySelector('.btn-twodice').style.visibility = 'visible';
        }, 500);
        
        setTimeout(function() {
            document.querySelector('.blackout').style.background = 'rgba(255, 255, 255, 0)';
            document.getElementById('settings-wrapper').style.opacity = 1;
            document.getElementById('settings-wrapper').style.visibility = 'visible';    
        }, 600);
        
    } else {
        swapStyleSheets('resources/css/style_' + color + '_1.css');
        document.querySelector('.btn-onedice').style.opacity = 0;
        document.querySelector('.btn-onedice').style.visibility = 'hidden';
        document.querySelector('.btn-twodice').style.opacity = 1;
        document.querySelector('.btn-twodice').style.visibility = 'visible';
    }
}

function gameTwoDice () {
    gameMode = 2;
    newGame();

    if (isFirefox) {
        document.querySelector('.blackout').style.background = 'rgba(255, 255, 255, 1)';
        document.getElementById('settings-wrapper').style.opacity = 0;
        document.getElementById('settings-wrapper').style.visibility = 'hidden'

        setTimeout(function(){
            swapStyleSheets('resources/css/style_' + color + '_2.css');
            document.querySelector('.btn-onedice').style.opacity = 1;
            document.querySelector('.btn-onedice').style.visibility = 'visible';
            document.querySelector('.btn-twodice').style.opacity = 0;
            document.querySelector('.btn-twodice').style.visibility = 'hidden';
        }, 500);

        setTimeout(function() {
            document.querySelector('.blackout').style.background = 'rgba(255, 255, 255, 0)';
            document.getElementById('settings-wrapper').style.opacity = 1;
            document.getElementById('settings-wrapper').style.visibility = 'visible';    
        }, 600);
        
    } else {
        swapStyleSheets('resources/css/style_' + color + '_2.css');
        document.querySelector('.btn-onedice').style.opacity = 1;
        document.querySelector('.btn-onedice').style.visibility = 'visible';
        document.querySelector('.btn-twodice').style.opacity = 0;
        document.querySelector('.btn-twodice').style.visibility = 'hidden';
    }
}

/*-------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------BUTTONS------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

/*-----------------------------GAME SCREEN BUTTONS-----------------------------*/

document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-settings').addEventListener('click', openSettings);

/*-----------------------------SETTINGS MENU BUTTONS-----------------------------*/

document.querySelector('.btn-back').addEventListener('click', closeSettings);
document.querySelector('.btn-red').addEventListener('click', changeRed);
document.querySelector('.btn-blue').addEventListener('click', changeBlue);
document.querySelector('.btn-purple').addEventListener('click', changePurple);
document.querySelector('.btn-green').addEventListener('click', changeGreen);
document.querySelector('.btn-onedice').addEventListener('click', gameOneDice);
document.querySelector('.btn-twodice').addEventListener('click', gameTwoDice);


/*-------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------GAME START-----------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------*/

newGame();