/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-12-05 05:56:17
 */
import Matrix4 from '../lib/cuon-matrix.js'
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n
    uniform vec4 u_translate;\n
    uniform vec4 u_rotate;\n
    void main() {\n\
    gl_Position = u_rotate*u_translate*a_pos;\n\
}`;

const FRAG_SHADER =
    `
    void main() {\n\
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n\
}`;

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
    0.3,0.3,
    0.6,0.0,
])


const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);


const u_translate = gl.getUniformLocation(program,'u_translate');
const u_rotate = gl.getUniformLocation(program,'u_rotate')


const matrix4 = new Matrix4('elements');
const translate = matrix4.translate(0,0,0);
const rotate = matrix4.rotate(0);
console.log('translate',translate.elements)
console.log(matrix4)
gl.uniformMatrix4fv(u_translate,false,translate.elements);
gl.uniformMatrix4fv(u_rotate,false,rotate.elements);
console.log(matrix4)




gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);


gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);
