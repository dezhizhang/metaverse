/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-17 20:30:08
 */
// import { mat4,glMatrix } from 'gl-matrix';

import { glMatrix, mat4 } from 'gl-matrix';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec2 a_position;
    uniform mat4 u_matrix;
    void main() {
        gl_Position = u_matrix * vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);


gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);


// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 创建几何体
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);



gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    0.0,0.0,
    0.3,0.3,
    0.6,0.0, 
]);


const rotateMatrial = mat4.create();
mat4.fromRotation(rotateMatrial,glMatrix.toRadian(10),[0,0,1]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const aPosition = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(aPosition);


const uMatrix = gl.getUniformLocation(program,'u_matrix');
gl.uniformMatrix4fv(uMatrix,false,rotateMatrial);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);
