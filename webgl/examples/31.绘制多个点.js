/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-11-27 14:21:10
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_Position;\n\
    attribute float a_size;\n\
    void main() {\n\
    gl_Position = a_Position;\n\
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

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

//边接几何体
gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const a_Position = gl.getAttribLocation(program,'a_Position');


const vertices = new Float32Array([
    0,0.1,
    -0.1,-0.1,
    0.1,-0.1
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);


gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0)

gl.enableVertexAttribArray(a_Position);


gl.drawArrays(gl.POINTS,0,3);

document.body.appendChild(canvas);




