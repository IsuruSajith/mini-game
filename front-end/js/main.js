/* Load all the images at the startup */
for(let i = 1; i <= 12; i++){
    const image = new Image();
    image.src  = `img/Jump (${i}).png`;
}
for(let i = 1; i <= 10; i++){
    const image = new Image();
    image.src  = `img/Idle (${i}).png`;
}
for(let i = 1; i <= 10; i++){
    const image = new Image();
    image.src  = `img/Walk (${i}).png`;
}

const boxElm = document.createElement('div');
boxElm.classList.add('box');
document.getElementById('background').append(boxElm);

document.body.addEventListener('click', ()=> document.body.requestFullscreen());

let jump = false;
let run = false;
let dx = 0;

document.body.addEventListener('keydown', (eventData)=> {
    if (eventData.code === 'Space'){
        jump = true;
    }else if (eventData.code === 'ArrowRight'){
        boxElm.style.transform = 'rotateY(0deg)'
        run = true;
        dx = 2;
    }else if (eventData.code === 'ArrowLeft'){
        boxElm.style.transform = 'rotateY(180deg)';
        run = true;
        dx = -2;
    }
});

document.body.addEventListener('keyup', (eventData) => {
    if (eventData.code === 'ArrowRight'){
        run = false;
        dx = 0;
    }else if (eventData.code === 'ArrowLeft'){
        run = false;
        dx = 0;
    }
});

let angle = 0;
function doJump(){
    let y  = Math.cos(angle * (Math.PI / 180));
    y *= 3;
    boxElm.style.top = (boxElm.offsetTop - y) + "px";
    angle++;
    if (angle >  180){
        jump = false;
        angle = 0;  
    }
}

function doRun(){
    let x = boxElm.offsetLeft + dx;
    if ((x + boxElm.offsetWidth)> innerWidth) {
        x = innerWidth - boxElm.offsetWidth;
    }else if (x <= -250) x = -250;
    boxElm.style.left = `${x}px`;
}

let i = 1;
function drawIdle(){
    boxElm.style.backgroundImage = `url('img/Idle (${i++}).png')`;
    if(i === 10) i = 1;
}

let k = 1;
function drawJump(){
    boxElm.style.backgroundImage = `url('img/Jump (${k++}).png')`;
    if(k === 12) k = 1;
}

let j = 1;
function drawRun(){
    boxElm.style.backgroundImage = `url('img/Walk (${j++}).png')`;
    if(j === 10) j = 1;
}

setInterval(()=> {
    if (jump){
        doJump();
    }
    if (run){
        doRun();
    }
}, 5);

setInterval(()=> {
    if (!jump && !run){
        drawIdle();
    }else if (jump){
        drawJump();
    }else if (!jump && run){
        drawRun();
    }
} , (1000/20));