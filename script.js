'use strict';
var scores, roundScore, activePlayer, isGameOn;

init();

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    isGameOn = true;

    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;
    document.querySelector('#name--0').textContent = 'Player 1'; 
    document.querySelector('#name--1').textContent = 'Player 2'; 
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

}

function switchPlayer() {
    document.querySelector('#current--' +activePlayer).textContent = 0;
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
}

document.querySelector('.btn--roll').addEventListener('click', function(){
    if(isGameOn){
        const dice = Math.floor(Math.random() * 6 + 1);
        const diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-'+dice+'.png';
        if(dice!==1){
            roundScore+=dice;
            document.querySelector('#current--' +activePlayer).textContent = roundScore;
        } else {
            switchPlayer();
        }
    }
})

document.querySelector('.btn--hold').addEventListener('click', function(){
    if(isGameOn){
        scores[activePlayer]+=roundScore;
        document.querySelector('#score--' +activePlayer).textContent = scores[activePlayer];
        if(scores[activePlayer]>=100){
            document.querySelector('.player--' +activePlayer).classList.add('player--winner');
            document.querySelector('#name--'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            isGameOn=false;
        } else {
            switchPlayer();
        }
    }
})

document.querySelector('.btn--new').addEventListener('click',init);