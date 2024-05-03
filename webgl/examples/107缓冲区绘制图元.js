/*
 * :file description: 
 * :name: /webgl/examples/107缓冲区绘制图元.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-03 15:47:58
 * :last editor: 张德志
 * :date last edited: 2024-05-03 15:48:11
 */
const width = 400;
const height = 400;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;

const fragShaderSource = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex, vertexShaderSource);
gl.shaderSource(frag, fragShaderSource);

gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program, vertex);
gl.attachShader(program, frag);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    0.0,0.0,
    0.3,0.3,
    0.6,0.0, 
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const aPosition = gl.getUniformLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(aPosition);



gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, dataVertices.length / 2);
gl.drawArrays(gl.POINTS, 0, dataVertices.length / 2);

document.body.appendChild(canvas);
