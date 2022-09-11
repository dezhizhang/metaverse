/*
 * :file description: 
 * :name: /canvas/example/16.渐变与阴影.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 15:56:33
 * :last editor: 张德志
 * :date last edited: 2022-09-11 16:33:33
 */

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

const lg = ctx.createRadialGradient(300,300,50,300,300,100);
lg.addColorStop(0,'blue');
lg.addColorStop(1,'red');

ctx.fillStyle = lg;
ctx.fillRect(100,100,200,200);