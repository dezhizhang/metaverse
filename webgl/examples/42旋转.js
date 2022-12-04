/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-12-04 16:11:21
 */
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height =500;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    uniform float u_sinB,u_cosB;\n\
    void main() {\n\
    gl_Position.x = a_pos.x * u_cosB - a_pos.y * u_sinB;\n
    gl_Position.y = a_pos.y * u_cosB + a_pos.y * u_cosB;\n
    gl_Position.z = a_pos.z;\n
    gl_Position.w = a_pos.w;\n
}`;

const FRAG_SHADER =
    `void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}`;


const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 创建链接
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);


// 创建链接
gl.linkProgram(program);
gl.useProgram(program);


// 创建顶点
const dataVertices = new Float32Array([
    0.0,0.0,
    0.3,0.3,
    0.6,0.0
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);

const angle = 30;
const sinB = Math.sin(angle / 180 * Math.PI);
const cosB = Math.cos(angle / 180 * Math.PI);

const u_sinB = gl.getUniformLocation(program,'u_sinB');
const u_cosB = gl.getUniformLocation(program,'u_cosB');


gl.uniform1f(u_sinB,sinB);
gl.uniform1f(u_cosB,cosB);


// 清屏操作
gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);