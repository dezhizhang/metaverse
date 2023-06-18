/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-18 20:39:42
 */

import { glMatrix, mat4 } from "gl-matrix";

import VERTEX_SHADER from "./shader/vertex.js";
import FRAG_SHADER from "./shader/frag.js";


// const FRAG_SHADER = /* glsl */ `
//     precision mediump float;
//     void main() {
//         gl_FragColor = vec4(1.0,0.0,0.0,1.0);
//     }
// `;

// const VERTEX_SHADER =  /* glsl */`
//     precision mediump float;
//     attribute vec3 a_position;
//     uniform mat4 u_rotateMatrix;
//     void main() {
//         gl_Position = u_rotateMatrix * vec4(a_position,1.0);
//         gl_PointSize = 10.0;
//     }
// `;

// export default VERTEX_SHADER;



const canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;

const gl = canvas.getContext("webgl");
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
    -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
]);

const uvs = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);
const aPosition = gl.getAttribLocation(program, "a_position");
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 3 * FSIZE, 0);
gl.enableVertexAttribArray(aPosition);

let deg = 0;
const rotateMatrix = mat4.create();
const u_rotateMatrix = gl.getUniformLocation(program, "u_rotateMatrix");
function tick() {
    
    deg++;
    mat4.fromRotation(rotateMatrix, glMatrix.toRadian(deg), [0, 0, 1]);

    gl.uniformMatrix4fv(u_rotateMatrix, false, rotateMatrix);
    requestAnimationFrame(tick);
    draw();

}

tick();

function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    document.body.appendChild(canvas);

}

draw();

