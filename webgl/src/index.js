/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2022-11-23 06:30:01
 */
// import VERTEX_SHADER from './vertex.glsl';
// import FRAG_SHADER from './fragment.glsl';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl');

gl.clearColor(0,0,0,1);

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    void main() {\n\
    gl_Position = a_pos;\n\
    gl_PointSize = 25.0;\n\
}`;

const FRAG_SHADER =
    `void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const fragment = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(fragment,FRAG_SHADER);


// 编译
gl.compileShader(vertex);
gl.compileShader(fragment);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,fragment);

gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);



document.body.appendChild(canvas);

