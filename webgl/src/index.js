/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-11-27 20:54:37
 */

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_Position;\n\
    // float angle = radians(30.0);\n\
    uniform float u_sinB;\n\
    uniform float u_cosB;\n\
    void main() {\n\
    // gl_Position = a_Position + u_translation;\n\
    gl_Position.x = a_Position.x * u_cosB - a_Position.y *u_sinB;\n
    gl_Position.y = a_Position.y * u_cosB + a_Position.x * u_sinB;\n
    gl_Position.z = a_Position.z;\n
    gl_Position.w = 1.0;\n
    gl_PointSize = 10.0;\n\
}`;

const FRAG_SHADER =
    `
    precision mediump float;\n\
    uniform vec4 u_color;\n\
    void main() {\n\
    gl_FragColor = vec4(1.0,0.0,1.0,1.0);\n\
}`;


const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

//编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 生成链接
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);


gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([
    0.0,0.1,
    -0.1,-0.1,
    0.1,-0.1
]);

const vertexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

const a_Position = gl.getAttribLocation(program,"a_Position");
const u_sinB = gl.getUniformLocation(program,'u_sinB');
const u_cosB = gl.getUniformLocation(program,'u_cosB');

const angle = 0.1;
gl.uniform1f(u_sinB,Math.sin(angle));
gl.uniform1f(u_cosB,Math.cos(angle));

gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

gl.enableVertexAttribArray(a_Position);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);


document.body.appendChild(canvas);
