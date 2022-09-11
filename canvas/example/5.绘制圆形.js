/*
 * :file description: 
 * :name: /canvas/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 06:47:11
 */

const canvas = document.createElement('canvas');
document.body.append(canvas);

canvas.width = 500;
canvas.height = 500;

canvas.style.border = '1px solid #eee'
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(300,300);
ctx.fillStyle = 'red';
ctx.strokeStyle = 'green';
ctx.arc(300,300,100,0, 30 * Math.PI / 180);
ctx.closePath();
ctx.stroke();
ctx.fill();



