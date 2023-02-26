/*
 * :file description: 
 * :name: /webgl/examples/67鼠标操作.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-02-26 17:32:10
 * :last editor: 张德志
 * :date last edited: 2023-02-26 17:32:18
 */

// LookAtTriangles.js (c) 2012 matsuda
import Matrix4 from '../lib/cuon-matrix';
import {
  initShaders
} from '../lib/cuon-utils';

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ViewMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

function main() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  document.body.appendChild(canvas);

  const gl = canvas.getContext('webgl');
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  const n = initVertexBuffers(gl);
  gl.clearColor(0, 0, 0, 1);

  const u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  const viewMatrix = new Matrix4();
  document.onkeydown = function () {
    keydown(ev, gl, n, u_ViewMatrix, viewMatrix);
  }

  draw(gl, n, u_ViewMatrix, viewMatrix);


}

function initVertexBuffers(gl) {
  const verticesColors = new Float32Array([
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4, // The back green one
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // The middle yellow one
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0, // The front blue one 
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4,
  ]);

  const n = 9;
  const vertexColorbuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER,vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER,verticesColors,gl.STATIC_DRAW);

  const FSIZE = verticesColors.BYTES_PER_ELEMENT;
  const a_Position = gl.getAttribLocation(gl.program,'a_Position');

  gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE * 6,0);
  gl.enableVertexAttribArray(a_Position);

  const a_Color = gl.getAttribLocation(gl.program,'a_Color');
  gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE * 6,FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  return n;
  
}

const g_eyeX = 0.20;
const g_eyeY = 0.25;
const g_eyeZ = 0.25;

function keydown(ev,gl,n,u_ViewMatrix,viewMatrix) {
  if(ev.keyCode === 39) {
    g_eyeX += 0.01;
  }else if(ev.keyCode == 37) {
    g_eyeX -= 0.01;
  }
  draw(gl, n, u_ViewMatrix, viewMatrix);
}

function draw(gl,n,u_ViewMatrix,viewMatrix) {
  viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0);

  gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,n);
  
}


main();
