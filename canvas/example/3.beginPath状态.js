/*
 * :file description: 
 * :name: /canvas/example/3.beginPath状态.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 06:01:18
 */

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;

canvas.style.border = '1px solid #ccc';
const ctx = canvas.getContext('2d');


ctx.lineWidth = 20;

ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(300,100);
ctx.strokeStyle = 'red';
ctx.stroke();
ctx.closePath();


ctx.beginPath();
ctx.moveTo(100,200);
ctx.lineTo(300,200);
ctx.strokeStyle = 'green';
ctx.stroke();
ctx.closePath();


