/*
 * :file description: 
 * :name: /webgl/examples/66三角变换.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-02-26 16:32:14
 * :last editor: 张德志
 * :date last edited: 2023-02-26 16:57:40
 */
import Matrix4 from '../lib/cuon-matrix';
import {
  initShaders
} from '../lib/cuon-utils';

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ViewMatrix * u_ModelMatrix * a_Position;\n' +
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

  const gl = canvas.getContext('webgl');
  document.body.appendChild(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const n = initVertexBuffers(gl);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  const u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0);

  const modelMatrix = new Matrix4();
  modelMatrix.setRotate(-10, 0, 0, 1);

  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);


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

  const vertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  const FSIZE = verticesColors.BYTES_PER_ELEMENT;
  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;

}
main();
