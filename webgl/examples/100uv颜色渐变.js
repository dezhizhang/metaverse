/*
 * :file description: 
 * :name: /webgl/examples/100uv颜色渐变.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-01 16:26:21
 * :last editor: 张德志
 * :date last edited: 2024-05-01 16:26:22
 */
import { mat4 } from 'gl-matrix';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main() {
        v_color = a_color;
        gl_Position = vec4(a_position,1.0);
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

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,vertexShaderSource);
gl.shaderSource(frag,fragShaderSource);

gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

gl.linkProgram(program);
gl.useProgram(program);



const dataVertices = new Float32Array([
    -0.5,0.5,0.0,
    -0.5,-0.5,0.0,
    0.5,-0.5,0.0,
    0.5,0.5,0.0,
]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const aPosition = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,3 * FSIZE,0);
gl.enableVertexAttribArray(aPosition);

const colorVertices = new Float32Array([
    1.0,0.0,0.0,
    0.0,1.0,0.0,
    0.0,0.0,1.0,
    1.0,1.0,1.0
]);

const colorsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,colorsBuffer);
gl.bufferData(gl.ARRAY_BUFFER,colorVertices,gl.STATIC_DRAW);

const aColor = gl.getAttribLocation(program,'a_color');
gl.vertexAttribPointer(aColor,3,gl.FLOAT,false,3 * FSIZE,0);
gl.enableVertexAttribArray(aColor);




gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN,0,4);
gl.drawArrays(gl.POINTS,0,4);

document.body.appendChild(canvas);


