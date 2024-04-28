/*
 * :file description: 
 * :name: /webgl/examples/93buffer生成纯色三角形.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:10:21
 * :last editor: 张德志
 * :date last edited: 2024-04-29 05:10:31
 */
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');


const vertexShaderSource = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
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

gl.compileShader(vertexShader);
gl.compileShader(fragShader);

const program = gl.createProgram();
gl.attachShader(program,vertexShader);
gl.attachShader(program,fragShader);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    -0.5,0.0,
    0.5,0.0,
    0.5,0.5,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_Position =  gl.getAttribLocation(program,'a_Position');
gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_Position);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);

