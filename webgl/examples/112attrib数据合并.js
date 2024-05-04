/*
 * :file description: 
 * :name: /webgl/examples/112attrib数据合并.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-29 05:25:20
 * :last editor: 张德志
 * :date last edited: 2024-05-04 17:12:18
 */
// const canvas = document.getElementById('canvas');
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl');


const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_Position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main() {
        v_color = a_color;
        gl_Position = vec4(a_Position,0.0,1.0);
        gl_PointSize = 10.0;
    }

`;

const fragShaderSource = `  
    precision mediump float;
    varying vec3 v_color;
    void main() {
        gl_FragColor = vec4(v_color,1.0);
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
    // x,y,r,g,b
    -0.5,0.0,1.0,0.0,0.0,
    0.5,0.0,0.0,1.0,0.0,
    0.0,0.5,0.0,0.0,1.0,
]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_Position =  gl.getAttribLocation(program,'a_Position');
gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,5 * FSIZE,0);
gl.enableVertexAttribArray(a_Position);

const a_Color = gl.getAttribLocation(program,'a_color');
gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,5 * FSIZE,2 * FSIZE);
gl.enableVertexAttribArray(a_Color);



gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);

