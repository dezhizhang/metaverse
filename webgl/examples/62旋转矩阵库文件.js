/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-20 07:29:57
 */
import Matrix4 from '../lib/cuon-matrix';

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const ANGLE = 90;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_Position;
    uniform mat4 u_xformMatrix;
    void main() {
        gl_Position = u_xformMatrix * a_Position;
    }
`;

const FRAGMENT_SHADER = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const freg = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(freg,FRAGMENT_SHADER);

// 编译
gl.compileShader(vertex,VERTEX_SHADER);
gl.compileShader(freg,FRAGMENT_SHADER);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,freg);

gl.linkProgram(program);
gl.useProgram(program);

const xformMatrix = new Matrix4();
xformMatrix.setRotate(ANGLE,0,0,1);

const n = 3;
const radian = Math.PI * ANGLE / 180;
const cosB = Math.cos(radian);
const sinB = Math.sin(radian);

const dataVertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5 
])


const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_Position = gl.getAttribLocation(program,'a_Position');
gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_Position);

const u_xformMatrix = gl.getUniformLocation(program,'u_xformMatrix');
gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,n);

document.body.appendChild(canvas);
