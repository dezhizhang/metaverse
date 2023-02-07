/*
 * :file description:
 * :name: /webgl/examples/49attribute.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-08 05:37:34
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const vertex = `
attribute vec2 a_position;
attribute float a_size;
void main() {
    gl_Position = vec4(a_position, 0, 1);
    gl_PointSize = a_size;
}`;

const fragment = `
void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

// program
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}

const program = createProgram(gl, vertexShader, fragmentShader);

const aPostion = gl.getAttribLocation(program, 'a_position');
const aSize = gl.getAttribLocation(program,'a_size');
// console.log('aPostion',aPostion)
gl.vertexAttrib2f(aPostion, 0.6, 0);
gl.vertexAttrib1f(aSize,20.0);


gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);

document.body.appendChild(canvas);
