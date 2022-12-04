/*
 * :file description: 
 * :name: /webgl/examples/43绘制不同大小的三角形.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-12-04 20:30:27
 * :last editor: 张德志
 * :date last edited: 2022-12-04 20:30:37
 */
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext('webgl');


const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    attribute float a_size;\n
    void main() {\n\
    gl_Position = a_pos;\n\
    gl_PointSize = a_size;\n\
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
    0.5,-0.5,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);

const dataSize = new Float32Array([
    10.0,
    20.0,
    30.0
]);

const bufferSize = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,bufferSize);
gl.bufferData(gl.ARRAY_BUFFER,dataSize,gl.STATIC_DRAW);

const a_size = gl.getAttribLocation(program,'a_size');
gl.vertexAttribPointer(a_size,1,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_size);


gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,3);

document.body.appendChild(canvas);