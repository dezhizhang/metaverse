/*
 * :file description: 
 * :name: /webgl/examples/旋转动画.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-30 06:06:38
 * :last editor: 张德志
 * :date last edited: 2024-04-30 06:06:40
 */


const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec4 a_position;

    uniform float u_sinB;
    uniform float u_cosB;
    void main() {
        float x1 = a_position.x;
        float y1 = a_position.y;
        float z1 = 0.0;

        float x2 =  x1 * u_cosB - y1 *u_sinB;
        float y2 = y1 * u_cosB + x1 * u_sinB;
        float z2 = z1;
        gl_Position = vec4(x2,y2,z2,1.0);
    }
`;

const FRAG_SHADER = `
    void main() {
    gl_FragColor = vec4(1.0,0.0,1.0,1.0);
}`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex, VERTEX_SHADER);
gl.shaderSource(frag, FRAG_SHADER);

//编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 生成链接
const program = gl.createProgram();
gl.attachShader(program, vertex);
gl.attachShader(program, frag);

gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertices = new Float32Array([0.0, 0.1, -0.1, -0.1, 0.1, -0.1]);

const vertexBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const aPosition = gl.getAttribLocation(program, 'a_position');
const uSinB = gl.getUniformLocation(program, 'u_sinB');
const uCosB = gl.getUniformLocation(program, 'u_cosB');

let angle = 45;

function tick() {
  angle += 1;

  requestAnimationFrame(tick);

  gl.uniform1f(uSinB, Math.sin(angle * Math.PI / 180));
  gl.uniform1f(uCosB, Math.cos(angle * Math.PI / 180));

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

tick();


document.body.appendChild(canvas);
