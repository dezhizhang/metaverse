/*
 * :file description: 
 * :name: /webgl/examples/36.缩放.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-11-27 22:23:27
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_Position;\n
    uniform float u_Scale;\n\
    void main() {
        gl_Position = vec4(vec3(a_Position) * u_Scale,1.0);\n
        gl_PointSize = 10.0;\n
    }
`;

const FRAG_SHADER = `
    precision mediump float;\n\
    uniform vec4 u_color;\n\
    void main() {
        gl_FragColor=vec4(1.0,0.0,1.0,1.0);\n
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

gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);

