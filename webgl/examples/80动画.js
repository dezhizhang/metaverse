
/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-06-11 19:34:15
 */
import { Matrix4 } from "../lib/cuon-matrix";
import { initShaders } from "../lib/cuon-utils";

const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    void main() {
        gl_Position = u_ModelMatrix * a_Position;
    }
`;

const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

const ANGLE_STEP = 45.0;

function main() {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;

  const gl = canvas.getContext("webgl");
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  const n = initVertexBuffers(gl);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");

  let currentAngle = 0.0;
  let modelMatrix = new Matrix4();

  let tick = function () {
    currentAngle = animate(currentAngle);
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
    requestAnimationFrame(tick, canvas);
  };

  tick();
  document.body.appendChild(canvas);
}

function initVertexBuffers(gl) {
  const vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);

  const n = 3;
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getUniformLocation(gl.program, "a_Position");
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_Position);

  return n;
}
function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
  modelMatrix.setRotate(currentAngle, 0, 0, 1);

  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

let g_last = Date.now();
function animate(angle) {
  let now = Date.now();
  let elapsed = now - g_last;
  g_last = now;

  let newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return (newAngle %= 360);
}

main();
