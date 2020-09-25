document.addEventListener("keydown", checkKeyPress, false);
var playerImg = document.querySelector("#player img");
var player = document.querySelector("#player");
var enemyImg = document.querySelector("#enemy img")
var enemy = document.querySelector("#enemy");


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var random;
let time = 0;
let punchDelay = true;
let playerMistake = false;
function enemyEngage(time){
    if(time > 50 || playerMistake){
        playerHealth -= 10;
        console.log(enemyHealth);
        enemyImg.style.setProperty('content', `url("sprites/enemy-strike.gif")`);
        playerImg.style.setProperty('content', `url("sprites/dead.gif")`);
        punchDelay = false;
        setTimeout(function() {
            enemyImg.style.setProperty('content', `url("sprites/enemy-idle.png")`);
            playerImg.style.setProperty('content', `url("sprites/idle.png")`);
            playerMistake = false;
            punchDelay = true;
        }, 650);
        return true;
    }
}
let startGame = false;
let engaged = true;
let gameEnded = false;
let playerHealth = 100;
let enemyHealth = 100;
let timeBeforeStart = 0;
let playerEngage = false;
let enemyWaitTime = 0;
let dodgeOrStrike = false;
var started = document.querySelector("#start");
function update(){
    if(playerHealth < 0 || enemyHealth < 0){
        gameEnded = true;
    }
    if(timeBeforeStart > 500 && gameEnded === false){
        started.style.display = "none";
        if(time < 75 && engaged){
            if(dodgeOrStrike){
                var hintbox = document.querySelector("#hintbox img")
                hintbox.style.setProperty('content', `url("sprites/punch.png")`);
            } else {
                var hintbox = document.querySelector("#hintbox img")
                hintbox.style.setProperty('content', `url("sprites/no.gif")`);
            }
            enemyWaitTime = 0;
            time++;
        } else {
            enemyWaitTime++;
            if(playerEngage){
                playerEngage = false;
                engaged = true;
            } else {
                engaged = enemyEngage(enemyWaitTime)
            }
            var hintbox = document.querySelector("#hintbox img")
            hintbox.style.setProperty('content', `url("")`);
            time = 0;
            random = getRandomInt(0, 1);
            dodgeOrStrike = (random == 1) ? true : false;
        }
    } else if(gameEnded){
        if(playerHealth > enemyHealth){
            started.style.display = "block";
            var msg = document.getElementById('start');
            msg.textContent = "Player wins the game! Press 'R' to play again.";
            console.log('Player wins!');
            enemyImg.style.setProperty('content', `url("sprites/enemy-dead.gif")`);
            enemy.style.setProperty('bottom', '460px');
            enemy.style.setProperty('right', '-110px')
            enemyImg.style.setProperty('width', '500px');
        } else {
            started.style.display = "block";
            var msg = document.getElementById('start');
            msg.textContent = "Opponent win the game! Press 'R' to try again."
            console.log('Opponent wins!');
            playerImg.style.setProperty('content', `url("sprites/dead.gif")`);
        }
    } else {
        timeBeforeStart++;
    }
    
    // console.log(time);
    // console.log(random);
    // console.log(time);
}
function interval(){
    setInterval(update, 10);
}
// interval();
function checkKeyPress(key){
    // console.log(random);
    if(key.keyCode == "69" && startGame === false){
        let title = document.getElementById('start');
        title.innerText = "The game shall start in 5 seconds";
        interval();
        startGame = true;
    }
    if(key.keyCode == "82"){
        window.location.reload();
    }
    if(key.keyCode == "68" && punchDelay){
        // console.log('cke');
        punchDelay = false;
        if(dodgeOrStrike){
            playerEngage = true;
            enemyHealth -= 10;
            console.log(playerHealth);
            playerImg.style.setProperty(`content`, `url("sprites/strike2.gif")`);
            enemyImg.style.setProperty('content', `url("sprites/enemy-dead.gif")`);
            enemy.style.setProperty('bottom', '460px');
            enemy.style.setProperty('right', '-110px')
            enemyImg.style.setProperty('width', '500px');
            setTimeout(function() {
                // let randomTime = getRandomInt(3, 8);
                // rightEnemy.style.setProperty('animation', `rightEnemyAnim ${randomTime}s infinite`);
                playerImg.style.setProperty(`content`, `url("sprites/idle.png")`);
                enemyImg.style.setProperty('content', `url("sprites/enemy-idle.png")`);
            enemy.style.setProperty('bottom', '449px');
            enemy.style.setProperty('right', '-150px')
            enemyImg.style.setProperty('width', '400px');
            punchDelay = true;
            }, 500);
        } else {
            playerMistake = true;
        }
    }

    if(key.keyCode == "65" && punchDelay){
        punchDelay = false;
        if(dodgeOrStrike === false){
            // console.log('cke');
            playerEngage = true;
            // playerImg.style.setProperty(`content`, `url("sprites/strike2.gif")`);
            // enemyImg.style.setProperty('content', `url("sprites/enemy-dead.gif")`);
            player.style.setProperty('left', '10px');
            // enemy.style.setProperty('right', '-250px')
            // enemyImg.style.setProperty('width', '500px');
            setTimeout(function() {
                // let randomTime = getRandomInt(3, 8);
                // rightEnemy.style.setProperty('animation', `rightEnemyAnim ${randomTime}s infinite`);
                player.style.setProperty('left', '130px');
                // enemyImg.style.setProperty('content', `url("sprites/enemy-idle.png")`);
            // enemy.style.setProperty('bottom', '449px');
            // enemy.style.setProperty('right', '-150px')
            // enemyImg.style.setProperty('width', '400px');
            punchDelay = true;
            }, 500);
        } else {
            playerMistake = true;
        }
    }
}