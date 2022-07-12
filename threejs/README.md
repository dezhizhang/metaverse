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