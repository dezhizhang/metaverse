/*
 * :file description: 
 * :name: /webgl/examples/52animation.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-12 05:55:29
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =`
    attribute vec2 a_position;
    uniform vec4 u_translate;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0) + u_translate;
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1);
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

// 连接几何体
gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    0.0,0.0,
    0.5,0.5,
    0.5,-0.5,
]);

const size = dataVertices.BYTES_PER_ELEMENT;

let tx = 0.0;
let ty = 0.0;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
const u_translate = gl.getUniformLocation(program,'u_translate');

gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);

function tick() {
    tx += 0.01;
    ty += 0.01;
    if(tx >= 0.5) {
        tx = 0;
    }
    if(ty >=0.5) {
        ty = 0;
    }
    gl.uniform4f(u_translate,tx,ty,0.0,0.0);
    draw();
    requestAnimationFrame(tick);
  

}

tick();

function draw() {
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    gl.drawArrays(gl.TRIANGLES,0,3);
}


draw();


document.body.appendChild(canvas);
