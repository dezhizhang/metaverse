/*
 * :file description: 
 * :name: /webgl/examples/86多矩阵组合.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-17 20:57:15
 */
// import { mat4,glMatrix } from 'gl-matrix';

import { glMatrix, mat4 } from 'gl-matrix';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec3 a_position;
    uniform mat4 t_matrix;
    uniform mat4 s_matrix;
    uniform mat4 r_matrix;
    void main() {
        mat4 modelMatrix = t_matrix * s_matrix;
        gl_Position = modelMatrix * vec4(a_position,1.0);
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
    -0.2,-0.2,0.0,
    0.2,-0.2,0.0,
    0.6,0.2,0.0,
]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const tMatrix = mat4.create();
const sMatrix = mat4.create();
const rMatrix = mat4.create();

mat4.fromTranslation(tMatrix,[0.5,0.0,0.0]);
mat4.fromScaling(sMatrix,[2,1,1]);
mat4.fromRotation(rMatrix,glMatrix.toRadian(30),[0.0,0.0,1.0]);



const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const aPosition = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,3 * FSIZE,0);
gl.enableVertexAttribArray(aPosition);


const t_matrix = gl.getUniformLocation(program,'t_matrix');
const s_matrix = gl.getUniformLocation(program,'s_matrix');
const r_matrix = gl.getUniformLocation(program,'s_matrix');
gl.uniformMatrix4fv(t_matrix,false,tMatrix);
gl.uniformMatrix4fv(s_matrix,false,sMatrix);
gl.uniformMatrix4fv(r_matrix,false,rMatrix);


gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);
