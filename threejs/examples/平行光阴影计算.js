/*
 * :file description: 
 * :name: /threejs/examples/平行光阴影计算.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 22:35:17
 * :last editor: 张德志
 * :date last edited: 2024-05-12 22:35:23
 */
import dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100,60,50);

directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -50;
directionalLight.shadow.camera.right = 50;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 600;
scene.add(directionalLight);

scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));




scene.add(new THREE.DirectionalLightHelper(directionalLight));


const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


// 长方体网格模型
const geometry = new THREE.BoxGeometry(50, 100, 50);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 50;
mesh.castShadow = true;


const planeGeometry = new THREE.PlaneGeometry(400,250);
const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x999999,
});
// 矩形平面网格模型
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotateX(-Math.PI/2);
// 接收阴影
planeMesh.receiveShadow = true;




scene.add(mesh,planeMesh);




// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);


const controls = new OrbitControls(camera,renderer.domElement);



window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
