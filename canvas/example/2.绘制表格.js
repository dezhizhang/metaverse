/*
 * :file description: 
 * :name: /canvas/example/2.绘制表格.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-10 23:31:34
 */

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #000';

const ctx = canvas.getContext('2d');


ctx.beginPath();
ctx.moveTo(0,0);


const rectH = 10;
const rectW = 10;

for(let i=0;i < Math.floor(canvas.width / rectW);i++) {
    ctx.moveTo(0,i * rectH);
    ctx.lineTo(canvas.width, i * rectH);

    ctx.moveTo(i * rectW,0);
    ctx.lineTo(i * rectH,canvas.height)
    ctx.strokeStyle = '#ccc';
}

ctx.closePath();
ctx.stroke();
