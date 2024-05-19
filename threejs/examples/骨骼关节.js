/*
 * :file description: 
 * :name: /threejs/examples/骨骼关节.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-19 13:44:09
 * :last editor: 张德志
 * :date last edited: 2024-05-19 13:44:10
 */
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);


const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

const bone1 = new THREE.Bone();
const bone2 = new THREE.Bone();
const bone3 = new THREE.Bone();


bone1.add(bone2);
bone2.add(bone3);

bone1.position.set(50,0,50);
bone2.position.y = 60;
bone3.position.y = 30;

const group = new THREE.Group();
group.add(bone1);
scene.add(group);


const helper = new THREE.SkeletonHelper(group);
scene.add(helper);


const gui = new dat.GUI();
gui.domElement.style.position = 'absolute';
gui.domElement.style.top = '0px';
gui.domElement.style.right = '0px';
gui.add(bone1.rotation,'x',0,Math.PI / 3).name('关节1');
gui.add(bone2.rotation,'x',0,Math.PI / 3).name('关节2');

document.body.appendChild(gui.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

const clock = new THREE.Clock()

function render() {
  // const frameT = clock.getDelta();
  requestAnimationFrame(render);
  // composer.render();
  renderer.render(scene, camera);
 

}

render();
