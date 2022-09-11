/*
 * :file description: 
 * :name: /canvas/example/21.多物体运动.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 20:25:04
 * :last editor: 张德志
 * :date last edited: 2022-09-11 21:13:24
 */
const canvas = document.createElement('canvas');
document.body.append(canvas);

canvas.width = 900;
canvas.height = 500;

canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

let arr = [];

setInterval(() => {
    ctx.save();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    for(let i=0;i < arr.length;i++) {
        ctx.beginPath();
        ctx.fillStyle =  arr[i].rgba;
        ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,360 *Math.PI / 180);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
},1000/ 60);



setInterval(() => {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    let r = 10;
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

},500)
