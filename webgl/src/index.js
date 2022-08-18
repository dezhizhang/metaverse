/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2022-08-18 23:38:58
 */
import Matrix4 from '../lib/cuon-matrix';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');



const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    attribute vec4 a_color;\n\
    varying vec4 v_color;\n\
    uniform mat4 u_ViewMatrix;\n
    void main() {\n\
    gl_Position = u_ViewMatrix * a_pos;\n\
    v_color = a_color;\n\
}
`;

const FRAG_SHADER =
    `
    precision lowp float;\n
    varying vec4 v_color;\n
    void main() {\n\
    gl_FragColor = v_color;\n\
}`;



const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);


// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

gl.linkProgram(program);
gl.useProgram(program);



// 创建顶点
const dataVertices = new Float32Array([
    0.0,0.5,-0.4,0.4,1.0,0.4,
    -0.5,0.5,-0.4,0.4,1.0,0.4,
    0.5,-0.5,-0.4,0.4,1.0,0.4,

    0.5,0.4,-0.2,0.4,1.0,0.4,
    -0.5,0.4,-0.2,0.4,1.0,0.4,
    0.0,-0.6,-0.2,0.4,1.0,0.4,

    0.0,0.5,0.0,0.4,0.4,1.4,
    -0.5,-0.5,0.0,0.4,0.4,1.4,
    0.5,-0.5,0.0,0.4,0.4,1.4,
]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_pos = gl.getAttribLocation(program,'a_pos');
const a_color = gl.getAttribLocation(program,'a_color');

gl.vertexAttribPointer(a_pos,3,gl.FLOAT,false,FSIZE * 6,0);
gl.vertexAttribPointer(a_color,3,gl.FLOAT,false,FSIZE * 6, FSIZE * 3);


gl.enableVertexAttribArray(a_pos);
gl.enableVertexAttribArray(a_color);


const matrix4 = new Matrix4();
matrix4.setOrtho(-1.0,1.0,-1.0,1.0,0,0.5);


const u_ViewMatrix = gl.getUniformLocation(program,'u_ViewMatrix');
gl.uniformMatrix4fv(u_ViewMatrix,false,matrix4.elements);



gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,9);
