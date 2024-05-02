/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-02 22:11:31
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
    void main() {
        gl_FragColor = vec4(0.0,1.0,0.0,1.0);
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

const arr = [];

window.addEventListener('click', (event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  //屏幕坐标转WebGL标准设备坐标
  const x = (sx / width) * 2 - 1;
  const y = -(sy / height) * 2 + 1;

  arr.push(x, y);

  const dataVertices = new Float32Array(arr);
  const FSIZE = dataVertices.BYTES_PER_ELEMENT;

  console.log(dataVertices);
  

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);
  const a_position = gl.getUniformLocation(program,'a_position');

  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, FSIZE * 2, 0);
  gl.enableVertexAttribArray(a_position);
  draw();
});

function draw() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 渲染立方体
  gl.drawArrays(gl.POINTS, 0, arr.length / 2 || 1);
}

draw();

document.body.appendChild(canvas);
