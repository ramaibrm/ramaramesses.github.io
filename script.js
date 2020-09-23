document.addEventListener("keydown", checkKeyPress, false);
let img = document.querySelector('#player img');
let leftEnemy = document.querySelector('#leftEnemy img');
let frontEnemy = document.querySelector('#frontEnemy img');
let rightEnemy = document.querySelector('#rightEnemy img');
let running = false
var interval;
let dead = false;
// function activate(){
//     let game = document.querySelector('#game');
//     let gameScr = document.querySelector('#gameScreen');
//     let ground = document.querySelector('#ground');
//     game.style.setProperty('display', 'block');
//     gameScr.style.setProperty('display', 'none');
//     ground.style.setProperty('display', 'block');
// }
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkKeyPress(key){
    if(key.keyCode == "68" && dead === false){
        punchRight();
    }
    if(key.keyCode == "65" && dead === false){
        leftKick();
    }
    if(key.keyCode == "83" && dead === false){
        punchFront();
    }
}

var player = document.getElementById("player");
var enemy = document.getElementById("enemy")

function punchRight(){
    img.classList.add("animate-rp");
    setTimeout(function() {
        img.classList.remove("animate-rp");
    }, 250);
    var enemyPos = window.getComputedStyle(rightEnemy).getPropertyValue("top");
    var enemyPosInt = parseInt(enemyPos);
    if(enemyPosInt < -370){
        console.log(enemyPosInt);
        rightEnemy.style.setProperty('animation', '0');
        rightEnemy.style.setProperty('top', `${enemyPosInt}px`);
        rightEnemy.style.setProperty(`content`, `url("sprites/die-left.png")`);
        setTimeout(function() {
            let randomTime = getRandomInt(3, 8);
            rightEnemy.style.setProperty('animation', `rightEnemyAnim ${randomTime}s infinite`);
            rightEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
        }, 500);
    }
}

function leftKick(){
    img.classList.add("animate-lk");
    setTimeout(function() {
        img.classList.remove("animate-lk");
    }, 250);
    var computedStyle = window.getComputedStyle(leftEnemy);
    var enemyPos = window.getComputedStyle(leftEnemy).getPropertyValue("top");
    var enemyPosInt = parseInt(enemyPos);
    if(enemyPosInt < 150){
        console.log('tes');
        leftEnemy.style.setProperty('animation', '0');
        leftEnemy.style.setProperty('top', `${enemyPosInt}px`);
        leftEnemy.style.setProperty(`content`, `url("sprites/die-left.png")`);
        setTimeout(function() {
            let randomTime = getRandomInt(5, 8);
            leftEnemy.style.setProperty('animation', `leftEnemyAnim ${randomTime}s infinite`);
            leftEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
        }, 500);
    }
}

function punchFront(){
    img.classList.add("animate-fp");
    setTimeout(function() {
        img.classList.remove("animate-fp");
    }, 250);
    var enemyPos = window.getComputedStyle(frontEnemy).getPropertyValue("top");
    var enemyPosInt = parseInt(enemyPos);
    if(enemyPosInt < -100){
        console.log(enemyPosInt);
        frontEnemy.style.setProperty('animation', '0');
        frontEnemy.style.setProperty('top', `${enemyPosInt}px`);
        frontEnemy.style.setProperty(`content`, `url("sprites/die-left.png")`);
        setTimeout(function() {
            let randomTime = getRandomInt(3, 8);
            frontEnemy.style.setProperty('animation', `frontEnemyAnim ${randomTime}s infinite`);
            frontEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
        }, 500);
    }
}

function update(){
    var leftEnemyPos = parseInt(window.getComputedStyle(leftEnemy).getPropertyValue("top"));
    var frontEnemyPos = parseInt(window.getComputedStyle(frontEnemy).getPropertyValue("top"));
    var rightEnemyPos = parseInt(window.getComputedStyle(rightEnemy).getPropertyValue("top"));
    // console.log(leftEnemyPos);
    if(leftEnemyPos < 70 || frontEnemyPos < -230 || rightEnemyPos < -470){
        dead = true;
        img.style.setProperty('content', `url("sprites/dead-player.gif")`);
        leftEnemy.style.setProperty('animation', '0');
        leftEnemy.style.setProperty('top', `${leftEnemyPos}px`);
        frontEnemy.style.setProperty('animation', '0');
        frontEnemy.style.setProperty('top', `${frontEnemyPos}px`);
        rightEnemy.style.setProperty('animation', '0');
        rightEnemy.style.setProperty('top', `${rightEnemyPos}px`);
        setTimeout(function() {
            var randomTime = getRandomInt(5, 7);
            img.style.setProperty('content', `url("sprites/idle.png")`);
            rightEnemy.style.setProperty('animation', `rightEnemyAnim ${randomTime}s infinite`);
            rightEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
            frontEnemy.style.setProperty('animation', `frontEnemyAnim ${randomTime}s infinite`);
            frontEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
            leftEnemy.style.setProperty('animation', `leftEnemyAnim ${randomTime}s infinite`);
            leftEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
            dead = false;
        }, 1000);
    }
}

function deathDetector(){
    interval = setInterval(update, 10);
}

deathDetector();