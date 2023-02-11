/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2023-02-12 06:23:39
 */
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');

const VERTEX_SHADER = `
    attribute vec2 a_position;
    uniform float cosB;
    uniform float sinB;
    
    void main() {
        float x1 = a_position.x;
        float y1 = a_position.y;
        float z1 = 0.0;

        float x2 = x1 * cosB - y1 * sinB;
        float y2 = x1 * sinB + y1 * cosB;

        float z2 = z1;

        gl_Position = vec4(x2,y2,z2,1.0);
        gl_PointSize = 10.0;
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
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

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

//创建点
const dataVertices = new Float32Array([
    0.0,0.0,
    0.5,0.5,
    0.5,-0.5
]);


const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);

const sinB = gl.getUniformLocation(program,'sinB');
const cosB = gl.getUniformLocation(program,'cosB');

let deg = 90;

gl.uniform1f(sinB, Math.sin(deg / 180 * Math.PI));
gl.uniform1f(cosB,Math.cos(deg / 180 * Math.PI));



gl.drawArrays(gl.TRIANGLES,0,3);

document.body.appendChild(canvas);
