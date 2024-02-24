
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);


const cubeTextureLoader = new THREE.CubeTextureLoader();
const envMap = cubeTextureLoader.load([
  '/parliament/negx.jpg',
  '/parliament/negy.jpg',
  '/parliament/negz.jpg',
  '/parliament/posx.jpg',
  '/parliament/posy.jpg',
  '/parliament/posz.jpg',
]);

scene.background = envMap;



const sphereGeometry = new THREE.SphereGeometry(1,20,20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness:0.7,
  roughness:0.1,
  envMap:envMap
});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);


// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();


const controls = new OrbitControls(camera,renderer.domElement);




// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



