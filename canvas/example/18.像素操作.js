/*
 * :file description: 
 * :name: /canvas/example/18.像素操作.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 17:15:18
 * :last editor: 张德志
 * :date last edited: 2022-09-11 17:28:08
 */
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(0,0,100,100);
const img = ctx.getImageData(0,0,100,100);
console.log(img.data);


ctx.putImageData(img,100,100);
