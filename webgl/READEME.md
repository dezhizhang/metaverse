# webgl
### 第一个webgl程序
```js 
// 创建canvas
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

// 添加到body
document.body.append(canvas);

// 获取绘图环境
const gl = canvas.getContext('webgl');

// 设置清空颜色
gl.clearColor(0,0,0,1);

gl.clear(gl.COLOR_BUFFER_BIT);

```
### 偏元着色器
```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    'void main() {\n\
    gl_Position = vec4(-0.5, 0, 0, 1);\n\
    gl_PointSize = 10.0;\n\
}';

const FRAG_SHADER =
    'void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}';


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

gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS,0,1);

```
### 旋转操作
```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    uniform float u_sinB,u_cosB;\n\
    void main() {\n\
    gl_Position.x = a_pos.x * u_cosB - a_pos.y * u_sinB;\n
    gl_Position.y = a_pos.y * u_cosB + a_pos.y * u_cosB;\n
    gl_Position.z = a_pos.z;\n
    gl_Position.w = a_pos.w;\n
}`;

const FRAG_SHADER =
    `void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}`;


const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

//创建几何体
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 链接几何体
gl.linkProgram(program);
gl.useProgram(program);

// 创建顶点
const dataVertices = new Float32Array([
    0.0,0.0,
    0.3,0.3,
    0.6,0.0, 
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);


const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);


const angle = 30;
const sinB = Math.sin(angle / 180 * Math.PI);
const cosB = Math.cos(angle / 180 * Math.PI);

const u_sinB = gl.getUniformLocation(program,'u_sinB');
const u_cosB = gl.getUniformLocation(program,'u_cosB');


gl.uniform1f(u_sinB,sinB);
gl.uniform1f(u_cosB,cosB);

// 清屏操作
gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);


gl.drawArrays(gl.TRIANGLES,0,3);
```
### 缩放操作
```js
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const VERTEX_SHADER =
    `
    attribute vec4 a_pos;\n\
    uniform float u_change;\n\
    void main() {\n\
    gl_Position.x = a_pos.x;\n
    gl_Position.y = a_pos.y;\n
    gl_Position.z = a_pos.z;\n
    gl_Position.w = u_change;\n
}`;

const FRAG_SHADER =
    `void main() {\n\
    gl_FragColor = vec4(1, 0, 0, 1);\n\
}`;


const vertex = gl.createShader(gl.VERTEX_SHADER);
const frag = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vertex,VERTEX_SHADER);
gl.shaderSource(frag,FRAG_SHADER);

// 编译
gl.compileShader(vertex);
gl.compileShader(frag);

//创建几何体
const program = gl.createProgram();
gl.attachShader(program,vertex);
gl.attachShader(program,frag);

// 链接几何体
gl.linkProgram(program);
gl.useProgram(program);

// 创建顶点
const dataVertices = new Float32Array([
    0.0,0.0,
    0.3,0.3,
    0.6,0.0, 
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);

gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);


const a_pos = gl.getAttribLocation(program,'a_pos');
gl.vertexAttribPointer(a_pos,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_pos);

const u_change = gl.getUniformLocation(program,'u_change');


let scale = 1;

function run() {
    gl.uniform1f(u_change,scale);
    // 清屏操作
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,3);
}

run();


window.addEventListener('keydown',(ev) => {
    if(ev.code === 'ArrowUp') {
        scale+= 0.1;
        
    }else{
        scale-= 0.1; 
    }
    run();
  console.log(ev);   
})
```
### uniform传值
```js
const fragShaderSource = `
    precision mediump float;
    uniform vec3 u_color;
    void main() {
        gl_FragColor = vec4(u_color,1);
    }
`;

const u_color = gl.getUniformLocation(program,'u_color');
gl.uniform3f(u_color,0.0,1.0,0.0);

```
### buffer生成纯色三角形
```js

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
```