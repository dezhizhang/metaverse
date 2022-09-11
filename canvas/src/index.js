/*
 * :file description: 
 * :name: /canvas/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:09:46
 * :last editor: 张德志
 * :date last edited: 2022-09-11 20:08:02
 */

import images from '../assets/img.jpeg';
const canvas = document.createElement('canvas');
document.body.append(canvas);

canvas.style.background = '#fff';

const ctx = canvas.getContext('2d');


const img = new Image();

img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);

    const getImg = ctx.getImageData(0,0,img.width,img.height);
    
    ctx.putImageData(getImg,200,200);

}

img.src = images;


