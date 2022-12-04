/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 15:47:48
 * :last editor: 张德志
 * :date last edited: 2022-12-03 06:32:16
 */
import { initShader } from '../lib/common';
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_position;\n
    void main() {
        gl_Position = a_position;\n
        gl_PointSize = 25.0;\n
    }
`;

const FRAG_SHADER = `
    precision lowp float;\n
    uniform vec4 u_color;\n
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n
    }
`;

const program = initShader(gl,VERTEX_SHADER,FRAG_SHADER);

const dataVertices = new Float32Array([
    0.0,0.0,
    0.5,0.5,
    0.5,-0.5,
    -0.5,-0.5,
    -0.5,0.5
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);


const a_position = gl.getAttribLocation(program,'a_position');

gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position)

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,5);

document.body.appendChild(canvas);

