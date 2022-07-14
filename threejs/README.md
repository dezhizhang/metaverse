### 第一个示例
```js
import * as THREE from 'three';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

//设置相机位置
camera.position.set(0,0,10);
scene.add(camera);


//创健几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

//将几何体添加到场影中
scene.add(cube);

//初始化沉浸器
const renderer = new THREE.WebGLRenderer();

//设置渲染大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);


renderer.render(scene,camera);

```
### 控制器的使用
```js

import * as THREE from 'three';
//引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

//创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

```
### 物体的移动cube.position.set();
```js
import * as THREE from 'three';
//引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

cube.position.set(1,1,-1)

// 将几何体添加场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);

scene.add(axesHelper);

function render() {
    cube.position.x += 0.1;
    if(cube.position.x > 5) {
        cube.position.x = 0;
    }
    console.log()
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();
```


