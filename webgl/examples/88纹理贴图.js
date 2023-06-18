/*
 * :file description:
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-18 15:38:16
 */
import cat from "./cat.png";


const canvas = document.createElement("canvas");

canvas.width = 500;
canvas.height = 500;

const gl = canvas.getContext("webgl");

const VERTEX_SHADER = `
    precision mediump float;
    attribute vec3 a_position;
    attribute vec2 a_uv;
    varying vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = vec4(a_position,1.0);
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_sampler;
    void main() {
        vec4 color = texture2D(u_sampler,v_uv);
        gl_FragColor = color;
    }
`;

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex, VERTEX_SHADER);
gl.shaderSource(frag, FRAG_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

// 创建几何体
const program = gl.createProgram();
gl.attachShader(program, vertex);
gl.attachShader(program, frag);

gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0, -0.5, 0.5, 0.0,
]);

const uvs = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);
const aPosition = gl.getAttribLocation(program, "a_position");
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 3 * FSIZE, 0);
gl.enableVertexAttribArray(aPosition);

const uvsBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvsBuffer);
gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
const aUv = gl.getAttribLocation(program, "a_uv");
gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 2 * FSIZE, 0);
gl.enableVertexAttribArray(aUv);

initTexture();

function initTexture() {
    let texture = gl.createTexture();
    let u_sampler = gl.getUniformLocation(program, "u_sampler");


    let image = new Image();
    image.src = cat;

    image.onload = function () {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
        
        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        gl.uniform1i(u_sampler, 0);
        draw();

    };
}



function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    document.body.appendChild(canvas);

}

draw();


