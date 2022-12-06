
// MultiAttributeSize_Interleaved.js (c) 2012 matsuda
// Vertex shader program

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
  'attribute vec4 a_Position;\n' +
  'attribute float a_PointSize;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_PointSize;\n' +
  '}\n';

// Fragment shader program
const FRAGMENT_SHADER =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
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

 // Set vertex coordinates and point sizes
 const n = initVertexBuffers(gl,program);

 // Specify the color for clearing <canvas>
 gl.clearColor(0.0, 0.0, 0.0, 1.0);

 // Clear <canvas>
 gl.clear(gl.COLOR_BUFFER_BIT);

 // Draw three points
 gl.drawArrays(gl.POINTS, 0, n);


 document.body.appendChild(canvas);

 function initVertexBuffers(gl,program) {
  const verticesSizes = new Float32Array([
    // Coordinate and size of points
     0.0,  0.5,  10.0,  // the 1st point
    -0.5, -0.5,  20.0,  // the 2nd point
     0.5, -0.5,  30.0   // the 3rd point
  ]);
  const n = 3;
  
  const vertexSizeBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,vertexSizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,verticesSizes,gl.STATIC_DRAW);

  const FSIZE = verticesSizes.BYTES_PER_ELEMENT;
  const a_Position = gl.getAttribLocation(program,'a_Position');
  gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE * 3,0);
  gl.enableVertexAttribArray(a_Position);

  const a_PointSize = gl.getAttribLocation(program,'a_PointSize');

  gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false, FSIZE * 3, FSIZE * 2);
  gl.enableVertexAttribArray(a_PointSize);

  gl.bindBuffer(gl.ARRAY_BUFFER,null);

  return n;

 }







