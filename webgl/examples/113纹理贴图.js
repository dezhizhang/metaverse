/*
 * :file description: 
 * :name: /webgl/examples/113纹理贴图.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-04 20:07:33
 * :last editor: 张德志
 * :date last edited: 2024-05-04 20:07:39
 */
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
  precision mediump float;
  attribute vec2 a_position;
  attribute vec2 a_pin;
  
  varying vec2 v_pin;
  void main() {
    v_pin = a_pin;
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = 10.0;
  }
`;

const fragShaderSource = `
  precision mediump float;
  uniform sampler2D u_sampler;
  varying vec2 v_pin;
  void main() {
    // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    gl_FragColor = texture2D(u_sampler,v_pin);
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
  -0.5, 0.5, 0.0, 1.0,
  -0.5, -0.5, 0.0, 0.0,
  0.5, 0.5, 1.0, 1.0, 
  0.5, -0.5, 1.0, 0.0,
]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program, 'a_position');
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 4 * FSIZE, 0);
gl.enableVertexAttribArray(a_position);

const a_pin = gl.getAttribLocation(program, 'a_pin');
gl.vertexAttribPointer(a_pin, 2, gl.FLOAT, false, 4 * FSIZE, 2 * FSIZE);
gl.enableVertexAttribArray(a_pin);

// 纹理贴图

const image = new Image();
image.src = '/cat.png';
image.onload = function () {
 

  const u_sampler = gl.getUniformLocation(program,'u_sampler');
   //onload()页面加载（文本和图片）完毕的时候
   const texture = gl.createTexture(); // 创建纹理对象

   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 反转Y轴
   gl.activeTexture(gl.TEXTURE0); // 激活纹理单元
   gl.bindTexture(gl.TEXTURE_2D, texture); // 绑定纹理对象

   gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); // 放大处理方式
   gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); // 缩小处理方式
   gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); // 水平平铺方式
   gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // 竖直平铺方式

   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image); // 配置纹理图像

   gl.uniform1i(u_sampler, 0); // 纹理单元传递给着色器

  draw();

};

function draw() {

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

draw();



document.body.appendChild(canvas);
