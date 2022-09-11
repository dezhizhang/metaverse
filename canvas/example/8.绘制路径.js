/*
 * :file description: 
 * :name: /canvas/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 10:06:37
 */

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #ccc';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');


ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(200,200);
ctx.lineTo(300,200);
ctx.lineTo(100,100);

ctx.stroke();
ctx.closePath();


ctx.beginPath();
ctx.moveTo(100,200);
ctx.lineTo(200,300);
ctx.lineTo(300,300);
ctx.lineTo(100,200);
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();


