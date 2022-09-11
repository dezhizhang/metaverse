
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);


canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';


const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;
setInterval(() => {
    x++;
    y++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeRect(x,y,100,100);
},39)

