/*
 * :file description: 
 * :name: /webgl/examples/92uniform传值.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-28 06:38:29
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_Position;
    uniform float u_Size;
    void main() {
        gl_Position = vec4(a_Position,0,1);
        gl_PointSize = u_Size;
    }
`;


const fragShaderSource = `
    precision mediump float;
    uniform vec3 u_color;
    void main() {
        gl_FragColor = vec4(u_color,1);
    }
`;


const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertexShader,vertexShaderSource);
gl.shaderSource(fragShader,fragShaderSource);

// 编译
gl.compileShader(vertexShader);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program,vertexShader);
gl.attachShader(program,fragShader);

gl.linkProgram(program);
gl.useProgram(program);


const a_Position = gl.getAttribLocation(program,'a_position');
gl.vertexAttrib1fv(a_Position,new Float32Array([0.5,0.0]));

const u_Size = gl.getUniformLocation(program,'u_Size');
gl.uniform1f(u_Size,40.0);

const u_color = gl.getUniformLocation(program,'u_color');
gl.uniform3f(u_color,0.0,0.0,1.0);



gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);
