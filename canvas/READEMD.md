# canvas
###
```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(100,100);
ctx.lineTo(200,100);
ctx.lineTo(100,200);
ctx.closePath();

ctx.strokeStyle = 'red';
ctx.fillStyle = 'yellow';
ctx.stroke();
ctx.fill();
```
### 绘制表格
```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #000';

const ctx = canvas.getContext('2d');

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

```
### 圆形绘制
```js
const canvas = document.createElement('canvas');
document.body.append(canvas);

canvas.width = 500;
canvas.height = 500;

canvas.style.border = '1px solid #eee'
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(300,300);
ctx.fillStyle = 'red';
ctx.strokeStyle = 'green';
ctx.arc(300,300,100,0, 30 * Math.PI / 180);
ctx.closePath();
ctx.stroke();
ctx.fill();

```
### 绘制圆孤
```js
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

```
### 作用域ctx.save()
```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #ccc';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');


ctx.save();

ctx.beginPath();
ctx.fillStyle = 'red';
ctx.moveTo(100,100);
ctx.lineTo(200,200);
ctx.lineTo(300,200);
ctx.lineTo(100,100);

ctx.fill();
ctx.closePath();
ctx.restore();


ctx.save();
ctx.beginPath();
ctx.fillStyle = 'green';
ctx.moveTo(100,200);
ctx.lineTo(200,300);
ctx.lineTo(300,300);
ctx.lineTo(100,200);
ctx.fill();

ctx.closePath();
ctx.restore();

```
### 方块的移动
```js
const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #ccc';
canvas.style.background = '#fff';


const ctx = canvas.getContext('2d');

canvas.onmousedown = function(ev) {
    
    const x = ev.pageX - canvas.offsetLeft;
    const y = ev.pageY - canvas.offsetTop;
    ctx.beginPath();

    ctx.moveTo(x,y);

    canvas.onmousemove = function(ev) {
        const x = ev.pageX - canvas.offsetLeft;
        const y = ev.pageY - canvas.offsetTop;
        console.log('ev',ev);
        ctx.lineTo(x,y);
        ctx.stroke();

    }

    canvas.onmouseup = function() {
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        
    }
}
```
### 绘制圆孤
```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.moveTo(300,300);
ctx.arc(300,300,100,0,90 * Math.PI / 180);
ctx.closePath();
ctx.stroke();
```
### 渐变
```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

const lg = ctx.createLinearGradient(100,100,100,300);
lg.addColorStop(0,'blue');
lg.addColorStop(1,'yellow')
ctx.fillStyle = lg;
ctx.fillRect(100,100,200,200)

```
### 像素操作
```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');

ctx.fillRect(0,0,100,100);
const img = ctx.getImageData(0,0,100,100);
for(let i=0;i < img.data.length;i++) {
    img.data[i*4] = 255;
}
ctx.putImageData(img,100,100);

```
### 像素的封装
```js
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;
canvas.style.background = '#fff';


const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillRect(0,0,100,100);

const img = ctx.getImageData(0,0,100,100);

for(let i=0;i < img.width;i++) {
    let colors = getXY(img,i,9);
    colors[0] = 255;
    setXY(img,i,9,colors);
}

ctx.putImageData(img,100,100);


function getXY(img,x,y) {
    const w = img.width;
    const d = img.data;

    let colors = [];
    colors[0] = d[(y * w + x) * 4];
    colors[1] = d[(y * w + x) * 4 + 1];
    colors[2] = d[(y * w + x) * 4 + 2];
    colors[3] = d[(y * w + x) * 4 + 3];

    return colors;

}

function setXY(img,x,y,colors) {
    const w = img.width;
    const d = img.data;

    d[(y * w + x) * 4] = colors[0];
    d[(y * w + x) * 4 + 1] = colors[1];
    d[(y * w + x) * 4 + 2] = colors[2];
    d[(y * w + x) * 4 + 3] = colors[3];
}
```



