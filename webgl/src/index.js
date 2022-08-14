/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2022-08-14 15:37:25
 */
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.append(canvas);

const gl = canvas.getContext('webgl');


const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    uniform float u_change;\n\
    void main() {\n\
    gl_Position.x = a_pos.x;\n
    gl_Position.y = a_pos.y;\n
    gl_Position.z = a_pos.z;\n
    gl_Position.w = u_change;\n
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

// 创建几何体
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 链接几何体
gl.linkProgram(program);
gl.useProgram(program);

// 创建顶点
const dataVertices = new Float32Array([
    -0.2,-0.2,
    0.0,0.2,
    0.2,-0.2, 
]);

// 创建buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);

const u_change = gl.getUniformLocation(program,'u_change');
gl.uniform1f(u_change,0.8);


// 清屏操作
gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);