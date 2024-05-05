/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:25:20
 * :last editor: 张德志
 * :date last edited: 2024-05-06 05:27:10
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
    vec4 v4_1= vec4(0,1,1,1);
    vec4 v4_2 = vec4(2,6,10,14);
    vec4 v4_3 = vec4(3,7,11,15);
    vec4 v4_4 = vec4(4,8,12,16);
    mat4 m = mat4(
      v4_1,
      v4_2,
      v4_3,
      v4_4
    );
    gl_FragColor = vec4(m[0].x,m[0].y,m[0].z,1.0);
  
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




gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, 1);

document.body.appendChild(canvas);
