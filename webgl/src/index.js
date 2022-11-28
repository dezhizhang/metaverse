/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-11-28 23:06:59
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_Position;\n
    attribute vec2 a_Pin;\n
    varying vec2 v_Pin;\n
    uniform float u_Scale;\n\
    void main() {
        gl_Position = a_Position;\n
        v_Pin = a_Pin;\n
    }
`;

const FRAG_SHADER = `
    precision mediump float;\n\
    uniform sampler2D u_Sampler;\n
    uniform vec4 u_color;\n\
    varying vec2 v_Pin;\n
    void main() {
        gl_FragColor = texture2D(u_Sampler,v_Pin);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

// 编译
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

const a_Position = gl.getAttribLocation(program,'a_Position');
const u_Scale = gl.getUniformLocation(program,'u_Scale');
gl.uniform1f(u_Scale,0.2);


gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

gl.enableVertexAttribArray(a_Position);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);


const source = new Float32Array([
    -0.5,0.5,0,1,
    -0.5,-0.5,0,0,
    0.5,0.5,1,1,
    0.5,-0.5,1,0
]);

const FSIZE = source.BYTES_PER_ELEMENT;
// 元素字节数
const elementBytes = source.BYTES_PER_ELEMENT;

const posSize = 2;
const pinSize = 2;

// 类目尺寸
const categorySize = posSize + pinSize;

// 类目字节数
const categoryBytes = categorySize * elementBytes;




gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);

