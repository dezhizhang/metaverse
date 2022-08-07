/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-08-07 14:40:23
 */
import glMatrix from 'gl-matrix';


function init() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('webgl');
    ctx.viewport(0,0,canvas.width,canvas.height);
    ctx.clearColor(0,1.0,1.0,1.0);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
    console.log(ctx);

}

init();