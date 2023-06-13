/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-14 07:11:39
 */
import { mat4 } from 'gl-matrix';



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

//创建几何体
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 链接几何体
gl.linkProgram(program);
gl.useProgram(program);

// 创建顶点
const dataVertices = new Float32Array([
    0.0,0.0,
    0.3,0.3,
    0.6,0.0, 
]);

// 缩放
// let scale_matrial = mat4.create();
// mat4.fromScaling(scale_matrial,[0.5,0.5,0.5]);

// const translate_matrial = mat4.create();
// mat4.fromTranslation(translate_matrial,[-0.3,-0.3,0]);

const rotate_matrial = mat4.create();
mat4.fromRotation(rotate_matrial, 10 / 180 * Math.PI,[0,0,1]);


const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);


const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);


const u_matrix = gl.getUniformLocation(program,'u_matrix');
gl.uniformMatrix4fv(u_matrix,false,rotate_matrial)

// 清屏操作
gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


gl.drawArrays(gl.TRIANGLES,0,3);

