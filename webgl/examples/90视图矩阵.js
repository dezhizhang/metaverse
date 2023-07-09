/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-18 22:04:04
 */
import { mat4 } from  'gl-matrix';

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    varying  vec3 v_color;
    uniform mat4 u_viewMatrix;
    void main() {
        v_color = a_color;
        gl_Position = u_viewMatrix * vec4(a_position,0.0,1.0);
    }
`;

const FRAG_SHADER = `
    precision mediump float;
    varying vec3 v_color;
    void main() {
        gl_FragColor = vec4(v_color,1.0);
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);


// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 创建对像
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 链接
gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const dataVertices = new Float32Array([
    0.0,0.0,1.0,0.0,0.0,
    0.5,0.5,0.0,1.0,0.0,
    0.5,-0.5,0.0,0.0,1.0,
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);


const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const a_position = gl.getAttribLocation(program,'a_position');
const a_color = gl.getAttribLocation(program,'a_color');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,5 * FSIZE,0);
gl.enableVertexAttribArray(a_position);

gl.vertexAttribPointer(a_color,3,gl.FLOAT,false,FSIZE * 5,FSIZE * 2)
gl.enableVertexAttribArray(a_color);

let eye = [0.2,0,0.5];
let center = [0,0,0];
let up = [0,1,0];


const viewMatrix = mat4.create();
mat4.lookAt(viewMatrix,eye,center,up);



const u_viewMatrix = gl.getUniformLocation(program,'u_viewMatrix');
gl.uniformMatrix4fv(u_viewMatrix,false,viewMatrix);

window.onkeydown = function(ev) {
    let step = 0.1;
    if(ev.keyCode === 37) {
        eye[0] -= step;
    }else if(ev.keyCode === 39) {
        eye[0] += step;
    }else if(ev.keyCode === 38) {
        eye[1] += step;
    }else if(ev.keyCode === 40) {
        eye[1] -= step;
    }
    mat4.lookAt(viewMatrix,eye,center,up);
    gl.uniformMatrix4fv(u_viewMatrix,false,viewMatrix);
    draw();


}

function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,3);
}

draw();

document.body.appendChild(canvas);
