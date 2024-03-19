
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-20 07:18:59
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,123,125);
camera.lookAt(0,0,0);


const A = new THREE.Vector3(0,30,0);
const B = new THREE.Vector3(80,0,0);


const sphere1 = createMesh(0xff00ff,2);
sphere1.position.copy(A);
scene.add(sphere1);

const sphere2 = createMesh(0x00ff00,2);
sphere2.position.copy(B);
scene.add(sphere2);


const AB = B.clone().sub(A);
const length = AB.length();

const dir = AB.clone().normalize(); // a方向
const arrow = new THREE.ArrowHelper(dir,A,length);
scene.add(arrow)


function createMesh(color,r) {
  const sphereGeometry = new THREE.SphereGeometry(r);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    color:color
  });
  const mesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
  return mesh;
}

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
})


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// // 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const controls = new OrbitControls(camera,renderer.domElement);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();



