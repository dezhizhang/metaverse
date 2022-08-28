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
### 引入threejs颜色库
```js
import * as THREE from 'three';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

// 实例化颜色
const color = new THREE.Color(`rgba(255,0,0,1)`);

gl.clearColor(color.r,color.g,color.b,1);
gl.clear(gl.COLOR_BUFFER_BIT);


```