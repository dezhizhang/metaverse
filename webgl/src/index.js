/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:25:20
 * :last editor: 张德志
 * :date last edited: 2024-05-09 06:56:41
 */

import { glMatrix, mat4 } from 'gl-matrix';

// const canvas = document.getElementById('canvas');
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
  attribute vec2 a_position;
  uniform mat4 u_projectionMatrix;
  void main() {
    gl_Position = u_projectionMatrix * vec4(a_position,0.0,1.0);
    gl_PointSize = 10.0;
  }
`;

const fragShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
`

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragShader, fragShaderSource);

gl.compileShader(vertexShader);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragShader);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
  -0.5,0.5,
  -0.5,-0.6,
  0.5,0.5,
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);

const tMatrix = mat4.create();

const u_projectionMatrix = gl.getUniformLocation(program,'u_projectionMatrix');
gl.uniformMatrix4fv(u_projectionMatrix,false,tMatrix);







gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

document.body.appendChild(canvas);
