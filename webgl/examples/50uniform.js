/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-08 06:07:24
 */
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const vertex = `
    attribute vec2 a_position;
    attribute float a_size;
    void main() {
        gl_Position = vec4(a_position,0,1);
        gl_PointSize = a_size;
    }
`;

const fragment = `
    precision lowp float;
    uniform vec3 u_color;
    void main() {
        gl_FragColor = vec4(u_color,1.0);
    }
`;

function createShader(gl,type,source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    return shader;
}

const vertexShader = createShader(gl,gl.VERTEX_SHADER,vertex);
const fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fragment);

// program
function createProgram(gl,vertexShader,fragmentShader)  {
    const program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    return program;
}

const program = createProgram(gl,vertexShader,fragmentShader);
const a_position = gl.getAttribLocation(program,'a_position');
const a_size = gl.getAttribLocation(program,'a_size');
const u_color = gl.getUniformLocation(program,'u_color');

gl.vertexAttrib2f(a_position,0.6,0);
gl.vertexAttrib1f(a_size,20.0);
gl.uniform3f(u_color,0.0,1.0,0.0);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);
