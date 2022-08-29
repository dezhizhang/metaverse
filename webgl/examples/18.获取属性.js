/*
 * :file description: 
 * :name: /webgl/examples/18.获取属性.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2022-08-29 22:59:00
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n
    void main() {\n\
    gl_Position = a_pos;\n\
    gl_PointSize = 10.0;\n\
}`;

const FRAG_SHADER =
    'void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}';

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


gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

const a_pos = gl.getAttribLocation(program,'a_pos')
gl.vertexAttrib4f(a_pos,0.0,0.0,1.0,1.0);


gl.drawArrays(gl.POINTS,0,1);
