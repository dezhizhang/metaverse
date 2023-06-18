/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-18 19:46:29
 */

import VERTEX_SHADER from './shader/vertex.js';
import FRAG_SHADER from './shader/frag.js';

console.log('FRAG_SHADER',VERTEX_SHADER);
console.log('FRAG_SHADER',FRAG_SHADER);


const canvas = document.createElement('canvas');

canvas.width = 500;
canvas.height = 500;

const gl = canvas.getContext('webgl');


const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);


gl.shaderSource(vertex, VERTEX_SHADER);
gl.shaderSource(frag, FRAG_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 创建几何体
const program = gl.createProgram();
gl.attachShader(program, vertex);
gl.attachShader(program, frag);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0,
    -0.5, 0.5, 0.0,
]);

const uvs = new Float32Array([
    0.0,0.0,
    1.0,0.0,
    1.0,1.0,
    0.0,1.0,
]);




const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);
const aPosition = gl.getAttribLocation(program, 'a_position');
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 3 * FSIZE, 0);
gl.enableVertexAttribArray(aPosition);

const uvsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
const aUv = gl.getAttribLocation(program, 'a_uv');
gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 2 * FSIZE, 0);
gl.enableVertexAttribArray(aUv);




gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

document.body.appendChild(canvas);