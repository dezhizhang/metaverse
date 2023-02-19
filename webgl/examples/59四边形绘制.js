/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-20 04:54:56
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
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

//创建对像
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,freg);

// 连接几何体
gl.linkProgram(program);
gl.useProgram(program);

const n = 4;
var dataVertices = new Float32Array([
    -0.5, 0.5,   -0.5, -0.5,   0.5, 0.5,　0.5, -0.5
]);


const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_Position = gl.getAttribLocation(program,'a_Position');
gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_Position);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLE_STRIP,0,n);

document.body.appendChild(canvas);
