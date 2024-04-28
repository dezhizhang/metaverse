/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-29 07:11:00
 */
// const canvas = document.getElementById('canvas');
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');


const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_position;
    uniform vec4 u_translate;

    void main() {
        gl_Position = vec4(a_position,0.0,1.0) + u_translate;
        gl_PointSize = 10.0;
    }
`;

const fragShaderSource = `
    precision mediump float;

    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`


const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader,vertexShaderSource);
gl.shaderSource(fragShader,fragShaderSource);

gl.compileShader(vertexShader);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program,vertexShader);
gl.attachShader(program,fragShader);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    -0.5,0.5,
    -0.5,-0.5,
    0.5,-0.5,

]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_Position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_Position);


let tx = 0;
let ty = 0;

const u_translate = gl.getUniformLocation(program,'u_translate');

 

function animation() {
    requestAnimationFrame(animation);
    tx += 0.001;
    ty += 0.001;
    gl.uniform4f(u_translate,tx,ty,0,0);

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,3);

}

animation();




document.body.appendChild(canvas);

