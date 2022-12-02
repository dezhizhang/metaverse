/*
 * :file description: 
 * :name: /webgl/examples/37.清屏.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-12-02 22:49:06
 * :last editor: 张德志
 * :date last edited: 2022-12-02 22:49:07
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');
gl.clearColor(0.0,1.0,1.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

document.body.appendChild(canvas);


