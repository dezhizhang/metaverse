/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-11-24 06:47:31
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

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
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);


// 编译
gl.compileShader(vertex);
gl.compileShader(frag);


const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 边接几何体
gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const a_position = gl.getAttribLocation(program,'a_pos');
gl.vertexAttrib4f(a_position,0.0,0.0,1.0,1.0);
gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);
