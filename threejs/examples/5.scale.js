
import * as THREE from 'three';
//引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
// 设置相机
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
cube.scale.set(1,2,1);
cube.rotation.set(1,1,4)
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);


// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);
// scene.add(controls);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

document.body.append(renderer.domElement);


function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render)
}

render();



