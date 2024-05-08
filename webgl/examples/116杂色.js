/*
 * :file description: 
 * :name: /webgl/examples/1116杂色.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-09 05:45:44
 * :last editor: 张德志
 * :date last edited: 2024-05-09 05:45:45
 */
/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:25:20
 * :last editor: 张德志
 * :date last edited: 2024-05-09 05:43:25
 */
// const canvas = document.getElementById('canvas');
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = 10.0;
  }
`;

const fragShaderSource = `
  precision mediump float;

  float rand(vec2 fragCoord) {
    vec2 a = vec2(0.1234,0.5678);
    float n = dot(fragCoord,a);
    return fract(sin(n) * 10000.0);
  }

  void main() {
    float f = rand(gl_FragCoord.xy);
    gl_FragColor = vec4(f,f,f,1);
  
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
  -1.0,1.0,
  -1.0,-1.0,
  1.0,1.0,
  1.0,-1.0 
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);







gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

document.body.appendChild(canvas);
