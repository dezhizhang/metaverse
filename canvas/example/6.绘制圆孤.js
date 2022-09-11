/*
 * :file description: 
 * :name: /canvas/example/6.绘制圆孤.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 08:08:14
 */
import {data} from './constants';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d');


let tempAngle = -90;
let x0 = 300;
let y0 = 300;
let radius = 200;
for(let i=0;i < data.length;i++) {
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    const angle = data[i].value * 360;
    ctx.fillStyle = data[i].color;
    const startAngle = tempAngle * Math.PI / 180;
    const endAngle = (tempAngle + angle) * Math.PI / 180;
    
    ctx.arc(x0,y0,radius,startAngle,endAngle);
    ctx.fill();
    tempAngle += angle;
}





