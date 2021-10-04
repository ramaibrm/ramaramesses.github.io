document.addEventListener("keydown", checkKeyPress, false);
let img = document.querySelector('#player img');
let leftEnemy = document.querySelector('#leftEnemy img');
let frontEnemy = document.querySelector('#frontEnemy img');
let rightEnemy = document.querySelector('#rightEnemy img');
let running = false
var interval;
let audio = document.querySelector("body audio");
let dead = false;
let score = 0;
let counter = 0;
// function activate(){
//     let game = document.querySelector('#game');
//     let gameScr = document.querySelector('#gameScreen');
//     let ground = document.querySelector('#ground');
//     game.style.setProperty('display', 'block');
//     gameScr.style.setProperty('display', 'none');
//     ground.style.setProperty('display', 'block');
// }
    let song = new Audio();
    song.src = "Punch Sound Effect - Gaming SFX.mp3";
    let kickSound = new Audio();
    kickSound.src = "Punch Sound Effect - Gaming SFX.mp3";
    let punchSound = new Audio();
    punchSound.src = "Punch Sound Effect - Gaming SFX.mp3";
    let deathSound = new Audio();
    let rightPunchSound = new Audio();
    rightPunchSound.src = "Punch Sound Effect - Gaming SFX.mp3";
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkKeyPress(key){
    if(key.keyCode == "68" && dead === false){
        punchRight();
    } else if(key.keyCode == "65" && dead === false){
        leftKick();
    } else if(key.keyCode == "83" && dead === false){
        punchFront();
    } else if(key.keyCode == "69" && gameStarted === false){
        song.src = "Bishi Bashi Special Ost 9.mp3";
        song.play();
        img.style.setProperty('content', `url("sprites/idle.png")`);
        gameStarted = true;
        leftEnemy.style.setProperty("animation", "leftEnemyAnim 5s infinite");
        rightEnemy.style.setProperty("animation", "rightEnemyAnim 5s infinite");
        frontEnemy.style.setProperty("animation", "frontEnemyAnim 8s infinite");
        // audio.style.setProperty("content", `url("Bishi Bashi Special Ost 9.mp3")`)
        document.getElementById("gameScore").style.display = "none";
        document.getElementById("enemyCounter").style.display = "none";
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
        
        rightPunchSound.play();
        score += 15;
        counter += 1;
        // console.log(enemyPosInt);
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
        score += 15;
        counter += 1;
       
        kickSound.play();
        // console.log('tes');
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
        punchSound.play();
        score += 15;
        counter += 1;
        // console.log(enemyPosInt);
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

leftEnemy.style.setProperty("animation", "0");
rightEnemy.style.setProperty("animation", "0");
frontEnemy.style.setProperty("animation", "0");
// audio.style.setProperty("content", "0");
let gameStarted = false;
function update(){
    if(gameStarted){
        document.getElementById("gameStart").style.display = "none";
        var leftEnemyPos = parseInt(window.getComputedStyle(leftEnemy).getPropertyValue("top"));
        var frontEnemyPos = parseInt(window.getComputedStyle(frontEnemy).getPropertyValue("top"));
        var rightEnemyPos = parseInt(window.getComputedStyle(rightEnemy).getPropertyValue("top"));
        // console.log(leftEnemyPos);
        if(leftEnemyPos < 70 || frontEnemyPos < -230 || rightEnemyPos < -470){
            document.getElementById("gameScore").style.display = "block";
            document.getElementById("gameScore").innerText = `Your score is ${score}`;
            document.getElementById("enemyCounter").style.display = "block";
            document.getElementById("enemyCounter").innerText = `You have countered ${counter} gangsters`;
            document.getElementById("gameStart").style.display = "block";
            document.getElementById("gameStart").innerText = "Press 'E' to start again.";
            gameStarted = false;
            dead = true;
            deathSound.src = "Death sound in Minecraft.mp3";
            deathSound.play();
            img.style.setProperty('content', `url("sprites/dead-player.gif")`);
            leftEnemy.style.setProperty('animation', '0');
            leftEnemy.style.setProperty('top', `${leftEnemyPos}px`);
            frontEnemy.style.setProperty('animation', '0');
            frontEnemy.style.setProperty('top', `${frontEnemyPos}px`);
            rightEnemy.style.setProperty('animation', '0');
            rightEnemy.style.setProperty('top', `${rightEnemyPos}px`);
            setTimeout(function() {
                var randomTime = getRandomInt(5, 7);
                // img.style.setProperty('content', `url("sprites/idle.png")`);
                rightEnemy.style.setProperty('animation', `rightEnemyAnim ${randomTime}s infinite`);
                rightEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
                frontEnemy.style.setProperty('animation', `frontEnemyAnim ${randomTime}s infinite`);
                frontEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
                leftEnemy.style.setProperty('animation', `leftEnemyAnim ${randomTime}s infinite`);
                leftEnemy.style.setProperty(`content`, `url("sprites/left-enemy.gif")`);
                dead = false;
            }, 1000);
            score = 0;
            counter =0;
        }
    } else {
        // img.style.setProperty('content', `url("sprites/dead-player.gif")`);
        leftEnemy.style.setProperty("animation", "0");
        rightEnemy.style.setProperty("animation", "0");
        frontEnemy.style.setProperty("animation", "0"); 
        leftEnemy.style.setProperty('animation', '0');
        leftEnemy.style.setProperty('top', `${leftEnemyPos}px`);
        frontEnemy.style.setProperty('animation', '0');
        frontEnemy.style.setProperty('top', `${frontEnemyPos}px`);
        rightEnemy.style.setProperty('animation', '0');
        rightEnemy.style.setProperty('top', `${rightEnemyPos}px`);
    }
}

function deathDetector(){
    interval = setInterval(update, 10);
}

deathDetector();