
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

### 颜色和顶点生成渐变四边形
```js
const dataVertices = new Float32Array([
    -0.5,0.5,0.0,  1.0,0.0,0.0,
    -0.5,-0.5,0.0, 0.0,1.0,0.0,
    0.5,-0.5,0.0,  0.0,0.0,1.0,
    0.5,0.5,0.0, 1.0,1.0,1.0
]);

const FSIZE = dataVertices.BYTES_PER_ELEMENT;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const aPosition = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,3,gl.FLOAT,false,6 * FSIZE,0);
gl.enableVertexAttribArray(aPosition);


const aColor = gl.getAttribLocation(program,'a_color');
gl.vertexAttribPointer(aColor,3,gl.FLOAT,false,6 * FSIZE,FSIZE * 3);
gl.enableVertexAttribArray(aColor);
```

### uv颜色渐变
```js
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

```
### canvas坐标转极坐标
```js
window.addEventListener('click',(event) => {

    const sx = event.clientX;
    const sy = event.clientY;
    //屏幕坐标转WebGL标准设备坐标
    const x = (sx / width) * 2 - 1;
    const y = -(sy / height) * 2 + 1;
    const vertextData = new Float32Array([x,y]);

    const aPosition = gl.getAttribLocation(program,'a_position');
    gl.vertexAttrib2fv(aPosition,vertextData);
    draw();
})

```
### 缓冲区绘制多个点

```js

const arr = [];

window.addEventListener('click', (event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  //屏幕坐标转WebGL标准设备坐标
  const x = (sx / width) * 2 - 1;
  const y = -(sy / height) * 2 + 1;

  arr.push(x, y);

  const dataVertices = new Float32Array(arr);
  const FSIZE = dataVertices.BYTES_PER_ELEMENT;

  console.log(dataVertices);
  

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  gl.bufferData(gl.ARRAY_BUFFER, dataVertices, gl.STATIC_DRAW);
  const a_position = gl.getUniformLocation(program,'a_position');

  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, FSIZE * 2, 0);
  gl.enableVertexAttribArray(a_position);
  draw();
});

function draw() {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 渲染立方体
  gl.drawArrays(gl.POINTS, 0, arr.length / 2 || 1);
}
```
### 点击生成随机大小的点
```js
window.addEventListener('click', (event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / width)* 2 - 1;
  const y = -(sy / height) * 2 + 1;

  const aPosition = gl.getAttribLocation(program, 'a_position');

  gl.vertexAttrib2fv(aPosition,new Float32Array([x,y]));
  

  const a_pointSize = gl.getAttribLocation(program, 'a_pointSize');
  gl.vertexAttrib1f(a_pointSize, Math.random() * 100);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 渲染立方体
  gl.drawArrays(gl.POINTS, 0, 1);
});
```
### 鼠标点击生成随机颜色
```js
const fragShaderSource = `
    precision mediump float;
    uniform vec3 u_color;
    void main() {
        gl_FragColor = vec4(u_color,1.0);
    }
`

window.addEventListener('click',(event) => {
    const sx = event.clientX;
    const sy = event.clientY;

    const x = (sx / width) * 2 - 1;
    const y = -(sy / width) * 2 + 1;

    const aPosition = gl.getAttribLocation(program,'a_position');
    gl.vertexAttrib2fv(aPosition,new Float32Array([x,y]));

    const aPointSize = gl.getAttribLocation(program,'a_pointSize');
    gl.vertexAttrib1f(aPointSize,Math.random() * 100);

    // 生成随机颜色
    const uColor = gl.getUniformLocation(program,'u_color');
    gl.uniform3f(uColor,Math.random(),Math.random(),Math.random());

    draw();
    
})

```
### 鼠标点击生成随机圆
```js
const fragShaderSource = `
    precision mediump float;
    uniform vec3 u_color;
    void main() {
        float dist = distance(gl_PointCoord,vec2(0.5,0.5));
        if(dist < 0.5) {
            gl_FragColor = vec4(u_color,1.0);
        }else {
            discard;
        }
        
    }
`;
window.addEventListener('click', (event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / width) * 2 - 1;
  const y = -(sy / width) * 2 + 1;

  const aPosition = gl.getAttribLocation(program, 'a_position');
  gl.vertexAttrib2fv(aPosition, new Float32Array([x, y]));

  const aPointSize = gl.getAttribLocation(program, 'a_pointSize');
  gl.vertexAttrib1f(aPointSize, Math.random() * 20);

  // 生成随机颜色
  const uColor = gl.getUniformLocation(program, 'u_color');
  gl.uniform3f(uColor, Math.random(), Math.random(), Math.random());

  draw();
});

```
### 缓冲区绘制图元
```js
const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;

const dataVertices = new Float32Array([
    0.0,0.0,
    0.3,0.3,
    0.6,0.0, 
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const aPosition = gl.getUniformLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(aPosition);
```

### 异步绘制图元
```js
const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0);
        gl_PointSize = 10.0;
    }
`
const dataVertices = [
    0,0.2,
];

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dataVertices),gl.STATIC_DRAW);

const aPosition = gl.getUniformLocation(program,'a_position');
gl.vertexAttribPointer(aPosition,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(aPosition);


setTimeout(() => {
    dataVertices.push(-0.2,-0.1);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dataVertices),gl.STATIC_DRAW);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, dataVertices.length / 2);
},1000);

setTimeout(() => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, dataVertices.length / 2);
    gl.drawArrays(gl.LINES,0,dataVertices.length / 2);
},2000)

```
### 矩阵平移变换
```js
const vertexShaderSource = `
    attribute vec2 a_position;
    uniform vec4 u_translation;
    void main() {
        gl_Position = vec4(a_position,0.0,1.0) + u_translation;
        gl_PointSize = 10.0;
    }
`;

const u_translation = gl.getUniformLocation(program,'u_translation');
gl.uniform4f(u_translation,0.0,0.8,0.0,0)
```
### 矩阵旋转变换
```js
const vertexShaderSource = `
    attribute vec2 a_position;
    uniform float u_sinB;
    uniform float u_cosB;
    void main() {
        float x = a_position.x * u_cosB - a_position.y * u_sinB;
        float y = a_position.y * u_cosB + a_position.x * u_sinB;
        gl_Position = vec4(x,y,0.0,1.0);
        gl_PointSize = 10.0;
    }
`;

const u_sinB = gl.getUniformLocation(program, 'u_sinB');
const u_cosB = gl.getUniformLocation(program, 'u_cosB');

let angle = 10;

function tick() {
  angle += 0.01;
  requestAnimationFrame(tick);
  gl.uniform1f(u_sinB, Math.sin(angle));
  gl.uniform1f(u_cosB, Math.cos(angle));
  draw();
  
}

tick();

```
### 缩放矩阵变换
```js
const vertexShaderSource = `
    attribute vec3 a_position;
    uniform float u_scale;
    void main() {
        gl_Position = vec4(vec3(a_position) * u_scale,1.0);
        gl_PointSize = 10.0;
    }
`
const u_scale = gl.getUniformLocation(program,'u_scale');
gl.uniform1f(u_scale,0.5);
```
### 多点异色
```js
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

const dataVertices = [
    0, 0.2,1.0,
    -0.5, -0.5,1.0,
    0.5, -0.5,1.0
];

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dataVertices),gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,3,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);



const dataColors = [
  1.0,0.0,0.0,
  0.0,1.0,0.0,
  0.0,0.0,1.0
];

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dataColors),gl.STATIC_DRAW);

const a_color = gl.getAttribLocation(program,'a_color');
gl.vertexAttribPointer(a_color,3,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_color);

```

### attrib数据合并
```js
const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_Position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main() {
        v_color = a_color;
        gl_Position = vec4(a_Position,0.0,1.0);
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
### 纹理贴图
```js
const vertexShaderSource = `
  precision mediump float;
  attribute vec2 a_position;
  attribute vec2 a_pin;
  
  varying vec2 v_pin;
  void main() {
    v_pin = a_pin;
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = 10.0;
  }
`;

const fragShaderSource = `
  precision mediump float;
  uniform sampler2D u_sampler;
  varying vec2 v_pin;
  void main() {
    // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    gl_FragColor = texture2D(u_sampler,v_pin);
  }
`;

// 纹理贴图

const image = new Image();
image.src = '/cat.png';
image.onload = function() {
  const u_sampler = gl.getUniformLocation(program,'u_sampler');
  const texture = gl.createTexture();
 // 反转Y轴
 gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
 // 激活纹理单元
 gl.activeTexture(gl.TEXTURE0);
 // 绑定纹理对像
 gl.bindTexture(gl.TEXTURE_2D,texture);
 gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image); // 配置纹理图像

 // 不加这四行不显示
 gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameterf(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
 gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
 gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // 竖直平铺方式


 gl.uniform1i(u_sampler, 0); // 纹理单元传递给着色器
 draw();

}

```
### 纹理贴图复制
```js
const vertexShaderSource = `
  precision mediump float;
  attribute vec2 a_position;
  attribute vec2 a_pin;
  
  varying vec2 v_pin;
  void main() {
    v_pin = a_pin;
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = 10.0;
  }
`;

const fragShaderSource = `
  precision mediump float;
  uniform sampler2D u_sampler;
  varying vec2 v_pin;
  void main() {
    // gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    gl_FragColor = texture2D(u_sampler,v_pin);
  }
`;

image.onload = function () {
  const texture = gl.createTexture();
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  // 激活纹理单元
  gl.activeTexture(gl.TEXTURE0);
  // 绑定纹理对像
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); // 纹理复制 256
  gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT); // 纹理复制 256
  gl.uniform1i(u_sampler, 0); // 纹理单元传递给着色器
  draw();
};


```
### 获取向量数据
```js
// 获取像素
const pixel = new Uint8Array(4);
gl.readPixels(
  canvas.width / 2, 
  canvas.height / 2,
  1,
  1,
  gl.RGBA,
  gl.UNSIGNED_BYTE,
  pixel
);

```
### 向量值获取
```js
const fragShaderSource = `
  precision mediump float;

  void main() {
    vec4 p = vec4(0.0,1.0,0.0,1.0);
    gl_FragColor = vec4(p.xyz,1.0);
  
  }
`;

```
### 矩阵的赋值与获取
```js
const fragShaderSource = `
  precision mediump float;

  void main() {
    vec4 v4_1= vec4(1,5,9,13);
    vec4 v4_2 = vec4(2,6,10,14);
    vec4 v4_3 = vec4(3,7,11,15);
    vec4 v4_4 = vec4(4,8,12,16);
    mat4 m = mat4(
      v4_1,
      v4_2,
      v4_3,
      v4_4
    );
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  
  }
`;
```
### 向量与矩阵运算
```js
const fragShaderSource = `
  precision mediump float;

  void main() {
    vec4 v4_1= vec4(1,5,9,13);
    vec4 v4_2 = vec4(2,6,10,14);
    vec4 v4_3 = vec4(3,7,11,15);
    vec4 v4_4 = vec4(4,8,12,16);
    mat4 m = mat4(
      v4_1,
      v4_2,
      v4_3,
      v4_4
    );

    vec4 p = vec4(1,2,3,4);
    vec4 v = m * p;

    gl_FragColor = v / 255.0;
  
  }
`;

```
### 结构体struct
```js
const fragShaderSource = `
  precision mediump float;

  struct Light {
    vec4 color;
    vec3 pos;
  };

  void main() {
    // 结构体实例化
    Light l1 = Light(
      vec4(0.0,1.0,0.0,1.0),
      vec3(1,2,3)
    );
    gl_FragColor = l1.color;
    // gl_FragColor = vec4(gl_FragCoord.x / u_width,gl_FragCoord.y / u_height,0.8,1.0);
  }
`
```
### 数组 vec4 vs[2]
```js
const fragShaderSource = `
  precision mediump float;

  vec4 vs[2];

  void main() {
    vs[0] = vec4(0.0,0.0,1.0,1.0);
    vs[1] = vec4(1.0,0.0,0.0,1.0);
    gl_FragColor = vs[1];
  }
`
```

### 渐变实现
```js
const fragShaderSource = `
  precision mediump float;
  uniform float u_width;
  uniform float u_height;
  void main() {
 
    gl_FragColor = vec4(gl_FragCoord.x /u_width,gl_FragCoord.y / u_height,0.0,1.0);
  
  }
`;

const dataVertices = new Float32Array([
  -1.0,1.0,
  -1.0,-1.0,
  1.0,1.0,
  1.0,-1.0 
]);
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,dataVertices,gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(program,'a_position');
gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_position);


const u_width = gl.getUniformLocation(program,'u_width');
const u_height = gl.getUniformLocation(program,'u_height');
gl.uniform1f(u_width,400);
gl.uniform1f(u_height,400);



```


<!-- https://www.bilibili.com/video/BV1zz4y1776c?p=51&vd_source=10257e657caa8b54111087a9329462e8 -->


[github](https://github.com/dezhizhang/metaverse/tree/main/webgl)   
[blog](https://doc.xiaozhi.shop/frontend/webgl)     
[网站](https://www.xiaozhi.shop/)     


