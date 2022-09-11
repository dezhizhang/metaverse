/*
 * :file description: 
 * :name: /canvas/example/19.操作像素.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-11 17:42:08
 * :last editor: 张德志
 * :date last edited: 2022-09-11 19:27:58
 */
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
    img.data[9 *img.width * 4 + i * 4] = 255
}

ctx.putImageData(img,100,100);