/*
 * :file description: 
 * :name: /webgl/examples/96glMatrix平移.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-30 06:39:10
 * :last editor: 张德志
 * :date last edited: 2024-04-30 06:39:24
 */
import { mat4 } from 'gl-matrix';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec2 a_position;
    uniform mat4 u_matrix;
    void main() {
        gl_Position = u_matrix * vec4(a_position,0.0,1.0);
    }
`;

const fragShaderSource = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,vertexShaderSource);
gl.shaderSource(frag,fragShaderSource);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

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

const matrix = mat4.create();
mat4.fromTranslation(matrix,[-0.5,-0.5,0.0]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STREAM_DRAW);

const aPosition = gl.getUniformLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(aPosition);


const uMatrix = gl.getUniformLocation(program,'u_matrix');
gl.uniformMatrix4fv(uMatrix,false,matrix);

gl.clearColor(0,0,0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);



gl.drawArrays(gl.TRIANGLES,0,3);

