/*
 * :file description: 
 * :name: /canvas/example/14.旋转与平移.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 15:21:58
 * :last editor: 张德志
 * :date last edited: 2022-09-11 15:28:28
 */
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

ctx.beginPath();

ctx.translate(100,100);
ctx.rotate(45 * Math.PI / 180);
ctx.fillStyle = 'red';
ctx.fillRect(0,0,100,100);

