/*
 * :file description: 
 * :name: /webgl/examples/81基本图元.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-11 20:23:05
 * :last editor: 张德志
 * :date last edited: 2023-06-11 20:23:06
 */
/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2023-06-11 20:21:44
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_pos;
    void main() {
        gl_Position = a_pos;
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1,0,0,1);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    0.0,0.0,
    0.5,0.5,
    0.5,-0.5,
    -0.5,-0.5,
    -0.5,-0.5,
])

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.LINES,0,5);

document.body.appendChild(canvas);

