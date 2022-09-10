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
