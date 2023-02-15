/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-15 22:49:57
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec3 a_position;
    attribute vec2 a_uv;

    varying vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = vec4(a_position,1.0);
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    precision mediump float;
    varying vec2 v_uv;
    void main() {
        gl_FragColor = vec4(v_uv,0.0,1.0);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

gl.compileShader(vertex);
gl.compileShader(frag);


// 创建对像
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);


// 连接几何体
gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    -0.5,-0.5,0.0,
    0.5,-0.5,0.0,
    0.5,0.5,0.0,
    -0.5,0.5,0.0,
]);

const uvs = new Float32Array([
    0.0,0.0,
    1.0,0.0,
    1.0,1.0,
    0.0,1.0,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,3,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);


const buffer1 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer1);
gl.bufferData(gl.ARRAY_BUFFER,uvs,gl.STATIC_DRAW);

const a_uv = gl.getAttribLocation(program,'a_uv');
gl.vertexAttribPointer(a_uv,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_uv);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLE_FAN,0,4);

document.body.appendChild(canvas);

