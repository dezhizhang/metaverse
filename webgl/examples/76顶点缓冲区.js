/*
 * :file description: 
 * :name: /webgl/examples/76顶点缓冲区.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-06-11 11:20:20
 */

const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_pos;
    void main() {
        gl_Position = a_pos;
        gl_PointSize = 25.0;
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
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

gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);


