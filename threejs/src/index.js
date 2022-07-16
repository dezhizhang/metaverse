
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



