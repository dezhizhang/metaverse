/*
 * :file description: 
 * :name: /webgl/examples/28.varying.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2022-09-10 14:31:09
 */

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n
    attribute vec4 a_color;\n
    varying vec4 v_color;\n
    void main() {\n\
    gl_Position = a_pos;\n\
    v_color = a_color;\n\
    gl_PointSize = 25.0;\n\
}`;

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

gl.compileShader(vertex);
gl.compileShader(frag);


const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);


gl.linkProgram(program);
gl.useProgram(program);

const dataVerticesColor = new Float32Array([
    0.0,0.0,1.0,0.0,0.0,
    -0.5,0.6,0.0,1.0,0.0,
    0.5,0.5,0.0,0.0,1.0
]);

const FSIZE = dataVerticesColor.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVerticesColor,gl.STATIC_DRAW);


const a_pos = gl.getAttribLocation(program,'a_pos');
const a_color = gl.getAttribLocation(program,'a_color');

gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,FSIZE * 5,0);
gl.vertexAttribPointer(a_color,3,gl.FLOAT,false, FSIZE * 5,FSIZE * 2);

gl.enableVertexAttribArray(a_pos);
gl.enableVertexAttribArray(a_color);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);




gl.drawArrays(gl.TRIANGLES,0,3);
