/*
 * :file description: 
 * :name: /webgl/examples/110缩放矩阵变换.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-04 14:56:26
 * :last editor: 张德志
 * :date last edited: 2024-05-04 14:56:27
 */
const width = 400;
const height = 400;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec3 a_position;
    uniform float u_scale;
    void main() {
        gl_Position = vec4(vec3(a_position) * u_scale,1.0);
        gl_PointSize = 10.0;
    }
`


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

const dataVertices = [
    0, 0.2,1.0,
    -0.5, -0.5,1.0,
    0.5, -0.5,1.0
];

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dataVertices),gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,3,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);

const u_scale = gl.getUniformLocation(program,'u_scale');
gl.uniform1f(u_scale,0.5);

function draw() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, dataVertices.length / 3);
}

draw();

document.body.appendChild(canvas);
