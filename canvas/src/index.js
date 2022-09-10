/*
 * :file description: 
 * :name: /canvas/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-10 22:34:21
 */

const app = document.getElementById('app');
const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d');

ctx.moveTo(100,100);
ctx.lineTo(200,100);
ctx.lineTo(100,200);

ctx.stroke();


