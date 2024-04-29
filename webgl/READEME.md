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
### 渐变三角形
```js
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

```

### webgl中添加动画
```ts 
const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_position;
    uniform vec4 u_translate;

    void main() {
        gl_Position = vec4(a_position,0.0,1.0) + u_translate;
        gl_PointSize = 10.0;
    }
`;


let tx = 0;
let ty = 0;

const u_translate = gl.getUniformLocation(program,'u_translate');

 

function animation() {
    requestAnimationFrame(animation);
    tx += 0.001;
    ty += 0.001;
    gl.uniform4f(u_translate,tx,ty,0,0);

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,3);

}
```

### 旋转动画
```js
const VERTEX_SHADER = `
    attribute vec4 a_position;

    uniform float u_sinB;
    uniform float u_cosB;
    void main() {
        float x1 = a_position.x;
        float y1 = a_position.y;
        float z1 = 0.0;

        float x2 =  x1 * u_cosB - y1 *u_sinB;
        float y2 = y1 * u_cosB + x1 * u_sinB;
        float z2 = z1;
        gl_Position = vec4(x2,y2,z2,1.0);
    }
`;


const aPosition = gl.getAttribLocation(program, 'a_position');
const uSinB = gl.getUniformLocation(program, 'u_sinB');
const uCosB = gl.getUniformLocation(program, 'u_cosB');

let angle = 45;

function tick() {
  angle += 1;

  requestAnimationFrame(tick);

  gl.uniform1f(uSinB, Math.sin(angle * Math.PI / 180));
  gl.uniform1f(uCosB, Math.cos(angle * Math.PI / 180));

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

tick();
```


