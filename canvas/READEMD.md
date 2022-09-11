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

