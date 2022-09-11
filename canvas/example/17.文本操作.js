/*
 * :file description: 
 * :name: /canvas/example/17.文本操作.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 16:33:59
 * :last editor: 张德志
 * :date last edited: 2022-09-11 16:40:15
 */
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

ctx.font = '60px 宋体';
ctx.textAlign = 'center';
ctx.fillText('hello canvas',100,100);