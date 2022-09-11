/*
 * :file description: 
 * :name: /canvas/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 21:35:44
 */

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.width = 900;
canvas.height = 500;


canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

let arr = [];

setInterval(() => {
   let r = 10;
   let x = canvas.width / 2;
   let y = canvas.height - r;
   const c1 = Math.floor(Math.random() * 255);
   const c2 = Math.floor(Math.random() * 255);
   const c3 = Math.floor(Math.random() * 255);
   const c4 = Math.floor(Math.random() * 255);
   const rgba =  `rgba(${c1},${c2},${c3},${c4})`
   arr.push({
    x,
    y,
    r,
    rgba
   })
},500);

setInterval(() => {
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i < arr.length;i++) {
        ctx.beginPath();
        ctx.fillStyle = arr[i].rgba;
        ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,360 * Math.PI / 180);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();

},1000 / 60)



