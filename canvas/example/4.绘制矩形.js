/*
 * :file description: 
 * :name: /canvas/example/4.绘制矩形.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 06:27:42
 * :last editor: 张德志
 * :date last edited: 2022-09-11 06:36:37
 */
const canvas = document.createElement('canvas');
document.body.append(canvas);

canvas.width = 500;
canvas.height = 500;

canvas.style.border = '1px solid #eee'
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillStyle = 'red';
ctx.strokeStyle = 'green';
ctx.fillRect(100,100,40,40);
ctx.stroke();

