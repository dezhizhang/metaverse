/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:25:20
 * :last editor: 张德志
 * :date last edited: 2024-05-05 22:48:51
 */
// const canvas = document.getElementById('canvas');
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
  precision mediump float;
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = 10.0;
  }
`;

const fragShaderSource = `
  precision mediump float;
  vec4 v = vec4(1,2,3,4) + vec4(5,6,7,8);
  void main() {
    // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    gl_FragColor = v / 255.0;
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader, vertexShaderSource);
gl.shaderSource(fragShader, fragShaderSource);

gl.compileShader(vertexShader);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragShader);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
  // x,y,uv
  -0.5, 0.5, 0.0, 2.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 2.0, 2.0, 0.5, -0.5, 2.0, 0.0,
]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program, 'a_position');
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 4 * FSIZE, 0);
gl.enableVertexAttribArray(a_position);

// 获取像素
const pixel = new Uint8Array(4);
gl.readPixels(
  canvas.width / 2, 
  canvas.height / 2,
  1,
  1,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  pixel
);


console.log(pixel);


function draw() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

draw();

document.body.appendChild(canvas);
