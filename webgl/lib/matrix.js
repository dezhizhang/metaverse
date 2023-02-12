/*
 * :file description: 
 * :name: /webgl/lib/matrix.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-12 09:13:26
 */
import * as glMatrix from "gl-matrix";

const { mat4 } = glMatrix;


const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec2 a_position;
    uniform mat4 u_matrix;
    void main() {
        gl_Position = u_matrix * vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1,0,0,1);
    }
`

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
    0.0,0.0,
    0.5,0.5,
    0.5,-0.5
]);


let scale_materix = mat4.create();
mat4.fromScaling(scale_materix,[0.5,0.5,1])

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);

const u_matrix = gl.getUniformLocation(program,'u_matrix');
gl.uniformMatrix4fv(u_matrix,false,new Float32Array(scale_materix))



gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);



gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);

