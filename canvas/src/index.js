const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'red';
ctx.strokeRect(50,50,80,80);

document.body.appendChild(canvas);


