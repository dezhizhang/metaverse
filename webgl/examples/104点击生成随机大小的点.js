/*
 * :file description:
 * :name: /webgl/examples/104点击生成随机大小的点.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-03 11:20:02
 */

const width = 400;
const height = 400;

const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute float a_pointSize;
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = a_pointSize;
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

window.addEventListener('click', (event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / width)* 2 - 1;
  const y = -(sy / height) * 2 + 1;

  const aPosition = gl.getAttribLocation(program, 'a_position');

  gl.vertexAttrib2fv(aPosition,new Float32Array([x,y]));
  

  const a_pointSize = gl.getAttribLocation(program, 'a_pointSize');
  gl.vertexAttrib1f(a_pointSize, Math.random() * 100);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 渲染立方体
  gl.drawArrays(gl.POINTS, 0, 1);
});

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 渲染立方体
gl.drawArrays(gl.POINTS, 0, 1);

document.body.appendChild(canvas);
