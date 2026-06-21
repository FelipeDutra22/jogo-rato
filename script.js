const rat = document.querySelector('.rat');
const cacto = document.querySelector('.cacto');
const cloud = document.querySelector('.cloud');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');
const timerDisplay = document.getElementById('timer');
const finalTimeDisplay = document.getElementById('final-time');
const jumpCountDisplay = document.getElementById('jump-count');
let jumpCount = 0;

let timerInterval = null;
let elapsedTime = 0;

const startTimer = () => {
    elapsedTime = 0;
    timerDisplay.textContent = '0.0s';
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        elapsedTime += 0.1;
        timerDisplay.textContent = elapsedTime.toFixed(1) + 's';
    }, 100);
};

const stopTimer = () => {
    clearInterval(timerInterval);
    finalTimeDisplay.textContent = elapsedTime.toFixed(1) + 's';
};

const jump = () => {
    rat.classList.add('jump');
    jumpCount++;
    jumpCountDisplay.textContent = jumpCount;
    setTimeout(() => { rat.classList.remove('jump'); }, 700);
};

const createLoop = () => {
    return setInterval(() => {
        const cactoPosition = cacto.offsetLeft;
        const ratPosition = +window.getComputedStyle(rat).bottom.replace('px', '');
        const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

        if (cactoPosition <= 100 && cactoPosition > 0 && ratPosition < 80) {
            cacto.style.animation = 'none';
            cacto.style.left = `${cactoPosition}px`;

            rat.style.animation = 'none';
            rat.style.bottom = `${ratPosition}px`;

            rat.src = 'img/died_rat.png';
            rat.style.width = '70px';
            rat.style.marginLeft = '35px';

            cloud.style.animation = 'cloud-animation 20s infinite linear';
            cloud.style.left = `${cloudPosition}px`;

            gameOver.style.visibility = 'visible';

            stopTimer();
            clearInterval(loop);
        }
    }, 10);
};

let loop = createLoop();
startTimer();

const restart = () => {
    gameOver.style.visibility = 'hidden';

    cacto.style.animation = 'cacto-animation 1.5s infinite linear';
    cacto.style.left = '';

    rat.src = 'img/rat.gif';
    rat.style.width = '130px';
    rat.style.bottom = '50px';
    rat.style.marginLeft = '';
    rat.style.animation = '';

    cloud.style.left = '';

    startTimer();
    jumpCount = 0;
    jumpCountDisplay.textContent = 0;
    loop = createLoop();
};

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
restartButton.addEventListener('click', restart);
