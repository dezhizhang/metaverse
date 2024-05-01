/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-05-01 16:25:00
 */
import { mat4 } from 'gl-matrix';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec2 a_uv;
    varying vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = vec4(a_position,1.0);
        gl_PointSize = 10.0;
    }
`;

const fragShaderSource = `
    precision mediump float;
    varying vec2 v_uv;
    void main() {
        gl_FragColor = vec4(v_uv,0.0,1.0);
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

const dataVertices = new Float32Array([
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0,
]);



const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);

const aPosition = gl.getAttribLocation(program, 'a_position');
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, FSIZE * 3, 0);
gl.enableVertexAttribArray(aPosition);



const uvs = new Float32Array([
    0.0,0.0,
    1.0,0.0,
    1.0,1.0,
    0.0,1.0,
]);

const uvBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,uvBuffer);
gl.bufferData(gl.ARRAY_BUFFER,uvs,gl.STATIC_DRAW);

const aUv = gl.getAttribLocation(program,'a_uv');
gl.vertexAttribPointer(aUv,2,gl.FLOAT,false,FSIZE * 2,0);
gl.enableVertexAttribArray(aUv);


gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
gl.drawArrays(gl.POINTS, 0, 4);

document.body.appendChild(canvas);
