/*
 * :file description: 
 * :name: /canvas/example/13.圆和典线.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 11:36:37
 * :last editor: 张德志
 * :date last edited: 2022-09-11 14:43:59
 */
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);


canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(300,300)
ctx.arc(300,300,100,0,90 *Math.PI / 180);
ctx.closePath();

ctx.stroke();

