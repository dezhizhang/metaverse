/*
 * :file description: 
 * :name: /webgl/examples/109矩阵旋转变换.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-04 14:32:03
 * :last editor: 张德志
 * :date last edited: 2024-05-04 14:32:19
 */

const width = 400;
const height = 400;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec2 a_position;
    uniform float u_sinB;
    uniform float u_cosB;
    void main() {
        float x = a_position.x * u_cosB - a_position.y * u_sinB;
        float y = a_position.y * u_cosB + a_position.x * u_sinB;
        gl_Position = vec4(x,y,0.0,1.0);
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

const dataVertices = [0, 0.2, -0.5, -0.5, 0.5, -0.5];

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataVertices), gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program, 'a_position');
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_position);

const u_sinB = gl.getUniformLocation(program, 'u_sinB');
const u_cosB = gl.getUniformLocation(program, 'u_cosB');

let angle = 10;

function tick() {
  angle += 0.01;
  requestAnimationFrame(tick);
  gl.uniform1f(u_sinB, Math.sin(angle));
  gl.uniform1f(u_cosB, Math.cos(angle));
  draw();
  
}

tick();

function draw() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, dataVertices.length / 2);
}

draw();

document.body.appendChild(canvas);
