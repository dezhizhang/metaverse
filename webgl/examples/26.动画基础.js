/*
 * :file description: 
 * :name: /webgl/examples/26.动画基础.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-09-04 14:58:34
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    uniform mat4 u_translate;\n\
    uniform mat4 u_rotate;\n\
    uniform mat4 u_scale;\n\
    void main() {\n\
    gl_Position = u_translate * u_rotate * u_scale  ;\n
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

// //创建几何体
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 链接几何体
gl.linkProgram(program);
gl.useProgram(program);

// 创建顶点
const dataVertices = new Float32Array([
    -1.0,0.0,
    -0.2,0.3,
    -0.6,-0.7, 
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);


const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);

const u_translate = gl.getUniformLocation(program,'u_translate');
const u_rotate = gl.getUniformLocation(program,'u_rotate');
const u_scale = gl.getUniformLocation(program,'u_scale');

let x = 0;
let y = 0;
let angle = 0;
let a = 1;
let b = 1;

gl.uniformMatrix4fv(u_translate,false,translate(x,y,0));
gl.uniformMatrix4fv(u_rotate,false,rotate(angle));
gl.uniformMatrix4fv(u_scale,false,scale(a,b,1.0));


gl.drawArrays(gl.TRIANGLES,0,3);