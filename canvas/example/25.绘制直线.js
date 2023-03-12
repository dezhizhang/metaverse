
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

ctx.moveTo(50,100);
ctx.lineTo(150,50);
ctx.stroke();

document.body.appendChild(canvas);

