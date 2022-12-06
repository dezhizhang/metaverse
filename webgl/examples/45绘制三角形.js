/*
 * :file description: 
 * :name: /webgl/examples/45绘制三角形.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-12-07 07:01:55
 * :last editor: 张德志
 * :date last edited: 2022-12-07 07:04:12
 */
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

// Fragment shader program
const FRAGMENT_SHADER =
  'precision mediump float;\n' +
  'uniform float u_Width;\n' +
  'uniform float u_Height;\n' +
  'void main() {\n' +
  '  gl_FragColor = vec4(gl_FragCoord.x/u_Width, 0.0, gl_FragCoord.y/u_Height, 1.0);\n' +
  '}\n';


  const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAGMENT_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 创建几何体
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 链接几何体
gl.linkProgram(program);
gl.useProgram(program);

var n = initVertexBuffers(gl,program);

gl.clearColor(0.0, 0.0, 0.0, 1.0);


gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, n);

document.body.appendChild(canvas);


function initVertexBuffers(gl,program) {
  const vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  const n = 3;
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(program,'a_Position');
  gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

  const u_Width = gl.getUniformLocation(program,'u_Width');
  const u_Height = gl.getUniformLocation(program,'u_Height');

  gl.uniform1f(u_Width,gl.drawingBufferWidth);
  gl.uniform1f(u_Height,gl.drawingBufferHeight);

  gl.enableVertexAttribArray(a_Position);

  gl.bindBuffer(gl.ARRAY_BUFFER,null);
  return n;
  
}



