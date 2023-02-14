/*
 * :file description: 
 * :name: /webgl/examples/55矩阵组合.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-12 21:02:25
 */
import * as GLMatrix from "gl-matrix";

const { mat4,glMatrix } = GLMatrix;

console.log('glMatrix',glMatrix);

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec3 a_position;
    uniform mat4 u_tMatrix;
    uniform mat4 u_sMatrix;
    uniform mat4 u_rMatrix;
    void main() {
        gl_Position =u_tMatrix * u_sMatrix * u_rMatrix *vec4(a_position,1.0);
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;

let tMatrix = mat4.create();
let sMatrix = mat4.create();
let rMatrix = mat4.create();

mat4.fromTranslation(tMatrix,[0.5,0.0,0.0]);
mat4.fromScaling(sMatrix,[2,1,1]);
mat4.fromRotation(rMatrix, glMatrix.toRadian(30),[0,0,1]);

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 创建对像
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 连接几何体
gl.linkProgram(program);
gl.useProgram(program);


// 创建点
const dataVertices = new Float32Array([
    -0.2,-0.2,0.0,
    0.2,-0.2,0.0,
    0.0,0.2,0.0
]);

const SIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,3,gl.FLOAT,false,3 * SIZE,0);
gl.enableVertexAttribArray(a_position);

const u_tMatrix = gl.getUniformLocation(program,'u_tMatrix');
const u_sMatrix = gl.getUniformLocation(program,'u_sMatrix');
const u_rMatrix = gl.getUniformLocation(program,'u_rMatrix');
gl.uniformMatrix4fv(u_tMatrix,false,tMatrix);
gl.uniformMatrix4fv(u_sMatrix,false,sMatrix);
gl.uniformMatrix4fv(u_rMatrix,false,rMatrix);


gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);


document.body.appendChild(canvas);

