/*
 * :file description: 
 * :name: /webgl/examples/101.生成立方体.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-01 20:12:57
 * :last editor: 张德志
 * :date last edited: 2024-05-01 20:13:06
 */

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;

const gl = canvas.getContext('webgl');



const VERTEX_SHADER = `
    attribute vec3 a_Position;
    void main() {
        gl_Position = vec4(a_Position,1.0);
    }
`;

const FRAG_SHADER = `
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;


// 定义立方体的顶点数据
var vertices = new Float32Array([
    // 正面
    -0.5, -0.5,  0.5,
     0.5, -0.5,  0.5,
     0.5,  0.5,  0.5,
    -0.5,  0.5,  0.5,
    // 背面
    -0.5, -0.5, -0.5,
    -0.5,  0.5, -0.5,
     0.5,  0.5, -0.5,
     0.5, -0.5, -0.5,
    // 左面
    -0.5, -0.5, -0.5,
    -0.5,  0.5, -0.5,
    -0.5,  0.5,  0.5,
    -0.5, -0.5,  0.5,
    // 右面
     0.5, -0.5, -0.5,
     0.5, -0.5,  0.5,
     0.5,  0.5,  0.5,
     0.5,  0.5, -0.5,
    // 上面
    -0.5,  0.5,  0.5,
     0.5,  0.5,  0.5,
     0.5,  0.5, -0.5,
    -0.5,  0.5, -0.5,
    // 下面
    -0.5, -0.5, -0.5,
    -0.5, -0.5,  0.5,
     0.5, -0.5, -0.5,
     0.5, -0.5,  0.5,
]);

const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);


gl.compileShader(vertex);
gl.compileShader(frag);

const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

gl.linkProgram(program);
gl.useProgram(program);
 
// 创建缓冲区
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
 
// 定义顶点着色器的a_Position属性
var a_PositionLocation = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_PositionLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_PositionLocation);
 
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 渲染立方体
gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);


document.body.appendChild(canvas);
