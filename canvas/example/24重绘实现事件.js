/*
 * :file description: 
 * :name: /canvas/example/24重绘实现事件.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 22:19:10
 */

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;

canvas.style.background = '#fff';
const ctx = canvas.getContext('2d');


function Arc(x,y,r,c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c || 'black';
    this.draw();

}

Arc.prototype.draw = function() {
    ctx.save();
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,360 * Math.PI / 180);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

}

Arc.prototype.reDraw = function(x,y,cb) {
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,360 * Math.PI / 180);
    ctx.closePath();
    ctx.fill();
    if(ctx.isPointInPath(x,y)) {
        cb();
    }
}

const a1 = new Arc(100,100,50);
const a2 = new Arc(200,200,50,'red');


canvas.onmousedown = function(ev) {
    let x = ev.pageX - canvas.offsetLeft;
    let y = ev.pageY - canvas.offsetTop;
    ctx.clearRect(0,0,canvas.width,canvas.height);


    a1.reDraw(x,y,function(){
        console.log('123');
    });

    a2.reDraw(x,y,function() {
        console.log('456');

    })
}

