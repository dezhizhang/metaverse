/*
 * :file description: 
 * :name: /webgl/examples/15.给制webgl.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-28 16:24:00
 * :last editor: 张德志
 * :date last edited: 2022-08-28 16:24:01
 */
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.append(canvas);

const gl = canvas.getContext('webgl');

gl.clearColor(0,0,0,1);

gl.clear(gl.COLOR_BUFFER_BIT);

