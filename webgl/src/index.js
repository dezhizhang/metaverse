/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:25:20
 * :last editor: 张德志
 * :date last edited: 2024-05-06 05:06:55
 */
// const canvas = document.getElementById('canvas');
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
  void main() {
    gl_Position = vec4(0.0,0.0,0.0,1.0);
    gl_PointSize = 512.0;
  }
`;

const fragShaderSource = `
  precision mediump float;

  void main() {
    vec4 p = vec4(0.0,1.0,0.0,1.0);
    gl_FragColor = vec4(p.xyz,1.0);
  
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


gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, 1);

document.body.appendChild(canvas);
