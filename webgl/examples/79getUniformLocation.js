/*
 * :file description: 
 * :name: /webgl/examples/79getUniformLocation.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-11 16:48:10
 * :last editor: 张德志
 * :date last edited: 2023-06-11 16:48:11
 */
const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;

const gl = canvas.getContext('webgl');
const VERTEX_SHADER = `
    precision mediump float;
    attribute vec3 v3Position;
    void main() {
        gl_Position = vec4(v3Position,1.0);
    }
`;

const FRAG_SHADER = `
    precision mediump float;
    uniform vec4 color;
    void main() {
        gl_FragColor = color;
    }
`;

let v3PositionIndex = 0.0;
let uniformColor = 1;
const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

gl.compileShader(vertex);
gl.compileShader(frag);

// 创建对像
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

gl.bindAttribLocation(program,v3PositionIndex,'v3Position');


// gl.bindAttribLocation(program,uniformColor,'color');


// 链接几何体
gl.linkProgram(program);
gl.useProgram(program);

const dataVertices = new Float32Array([
    //x,   y,   z,   r    g    b    a
    -0.5, 0.5, 0.0, 1.0, 0.0, 0.0, 1.0,
    0.5,  0.5, 0.0, 0.0, 1.0, 0.0, 1.0,
    0.5, -0.5, 0.0, 0.0, 0.0, 1.0, 1.0,
    -0.5, -0.5, 0.0, 1.0, 1.0, 0.0, 1.0,
]);

const indexVertices = new Uint16Array([
    0,1,2,
    0,2,3
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexVertices,gl.STATIC_DRAW);


const color = gl.getUniformLocation(program,'color');
gl.uniform4f(color,1.0,0.0,1.0,1.0);


gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);

gl.enableVertexAttribArray(v3PositionIndex);



gl.vertexAttribPointer(v3PositionIndex,3,gl.FLOAT,false,4 * 7,0);


gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0);

document.body.appendChild(canvas);

