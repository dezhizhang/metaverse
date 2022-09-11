/*
 * :file description: 
 * :name: /canvas/example/10.鼠标画线.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 11:04:06
 */

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);


canvas.width = 500;
canvas.height = 500;
canvas.style.border = '1px solid #eee';
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
        ctx.lineTo(x,y);
        ctx.stroke();
        

    }
    canvas.onmouseup = function() {
        canvas.onmousedown = null;
        canvas.onmousemove = null;
        
    }
}