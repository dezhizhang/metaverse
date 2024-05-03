/*
 * :file description: 
 * :name: /webgl/examples/106鼠标点击生成随机圆.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-03 14:57:15
 * :last editor: 张德志
 * :date last edited: 2024-05-03 14:57:16
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
    precision mediump float;
    uniform vec3 u_color;
    void main() {
        float dist = distance(gl_PointCoord,vec2(0.5,0.5));
        if(dist < 0.5) {
            gl_FragColor = vec4(u_color,1.0);
        }else {
            discard;
        }
        
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

  const x = (sx / width) * 2 - 1;
  const y = -(sy / width) * 2 + 1;

  const aPosition = gl.getAttribLocation(program, 'a_position');
  gl.vertexAttrib2fv(aPosition, new Float32Array([x, y]));

  const aPointSize = gl.getAttribLocation(program, 'a_pointSize');
  gl.vertexAttrib1f(aPointSize, Math.random() * 20);

  // 生成随机颜色
  const uColor = gl.getUniformLocation(program, 'u_color');
  gl.uniform3f(uColor, Math.random(), Math.random(), Math.random());

  draw();
});

function draw() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}

draw();

document.body.appendChild(canvas);
