/*
 * :file description: 
 * :name: /canvas/example/12.绘制边界.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 11:25:18
 */

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);


canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';


const ctx = canvas.getContext('2d');
ctx.save();
ctx.beginPath();
ctx.lineWidth = 20;
ctx.lineCap = 'butt';
ctx.moveTo(100,200);
ctx.lineTo(300,200);
ctx.stroke();

ctx.save();
ctx.beginPath();
ctx.lineWidth = 20;
ctx.lineCap = 'round';
ctx.moveTo(100,100);
ctx.lineTo(300,100);
ctx.stroke();
ctx.restore();

ctx.save();
ctx.beginPath();
ctx.lineWidth = 20;
ctx.lineCap = 'square';
ctx.moveTo(100,300);
ctx.lineTo(300,300);
ctx.stroke();
ctx.restore();




