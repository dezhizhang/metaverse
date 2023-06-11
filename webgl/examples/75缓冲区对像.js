/*
 * :file description: 
 * :name: /webgl/examples/75缓冲区对像.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-11 09:58:21
 * :last editor: 张德志
 * :date last edited: 2023-06-11 09:58:29
 */
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');
gl.viewport(0,0,canvas.clientWidth,canvas.clientHeight);
gl.clearColor(1.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


document.body.appendChild(canvas);

