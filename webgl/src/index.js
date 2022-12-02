/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 15:47:48
 * :last editor: 张德志
 * :date last edited: 2022-12-03 06:24:13
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
        gl_FragColor = u_color;\n
    }
`;

const program = initShader(gl,VERTEX_SHADER,FRAG_SHADER);

const a_position = gl.getAttribLocation(program,'a_position');
const u_color = gl.getUniformLocation(program,'u_color');
gl.vertexAttrib4f(a_position,-0.5,0.0,0.0,1.0);
gl.uniform4f(u_color,1.0,1.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);

