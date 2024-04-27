/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-27 21:06:13
 */

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    void main() {
        gl_Position = vec4(0,0,0,1);
        gl_PointSize = 10.0;
    }
`;

const fragShaderSource = `
    void main() {
        gl_FragColor = vec4(1,0,0,1);
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

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);

document.body.appendChild(canvas);
