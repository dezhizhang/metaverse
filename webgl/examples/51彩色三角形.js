/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-10 05:53:13
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main() {
        v_color = a_color;
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    precision mediump float;
    varying vec3 v_color;
    void main() {
        gl_FragColor = vec4(v_color,1);
    }
`;

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

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

//创建点
const dataVertices = new Float32Array([
    0.0,0.0,1.0,0.0,0.0,
    0.5,0.5,0.0,1.0,0.0,
    0.5,-0.5,0.0,0.0,1.0
]);

const size = dataVertices.BYTES_PER_ELEMENT;
console.log(size);


const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
const a_color = gl.getAttribLocation(program,'a_color')
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,5 * size,0);
gl.enableVertexAttribArray(a_position);


gl.vertexAttribPointer(a_color,3,gl.FLOAT,false,5 * size,2 * size);
gl.enableVertexAttribArray(a_color);

let n = 3;

gl.drawArrays(gl.TRIANGLES,0,n);
gl.drawArrays(gl.LINES,0,n);
gl.drawArrays(gl.POINTS,0,n);
document.body.appendChild(canvas);
