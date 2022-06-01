// declaration des variables
let scores, roundScore, activePlayer, gamePlaying;

init();

// le boutton roll
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        // le nombre aléatoire pour le 6 face du dés
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. l'affichage des résultats
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // 3. Mettre à jour le score du tour si le numéro obtenu n'est pas égal à 1, si le joueur obtient 1 il passe son tour 
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById(
                "current-" + activePlayer
            ).textContent = roundScore;
        } else {

            nextPlayer();
        }
    }
});

// le bouton HOLD
document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        //  le score actuel est ajouté au score global 
        scores[activePlayer] += roundScore;


        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        // on verifie le quel joueur qui gagne , le gagnant c'est celui qui atteint le score superieur ou égal à 30 points
        if (scores[activePlayer] >= 30) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.dispaly = "none";

            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");

            gamePlaying = false;
        } else {

            nextPlayer();

        }
    }
});

function nextPlayer() {
    roundScore = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}

// le bouton NEW-GAME 
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    //on réinitialise les variables de score
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    //on réinitialise tous score
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    //on réinitialise les noms des joueurs
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    // on Supprime les classes des panneaux d'affichage
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}