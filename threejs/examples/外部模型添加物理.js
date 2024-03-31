/*
 * :file description: 
 * :name: /threejs/examples/外部模型添加物理.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 22:10:40
 * :last editor: 张德志
 * :date last edited: 2024-03-31 22:10:41
 */
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const mesh = new THREE.Group();

//  立方体几何体
const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/box.glb',(gltf) => {
  mesh.add(gltf.scene);
});

mesh.position.y = 5;
mesh.quaternion.setFromEuler(Math.PI / 3,Math.PI / 3,Math.PI / 3);
scene.add(mesh);

// 设置包围盒
const box3 = new THREE.Box3();
box3.expandByObject(mesh);
const size = new THREE.Vector3();
box3.getSize(size);




// 创建平面
const planeGeometry = new THREE.PlaneGeometry(200, 200);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x777777,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const world = new CANNON.World();
world.gravity.set(0,-9.8,0);

const cubeMaterial = new CANNON.Material();

const body = new CANNON.Body({
  mass:0.5,
  material:cubeMaterial,
  shape: new CANNON.Box(new CANNON.Vec3(size.x / 2,size.y / 2,size.z / 2))
});
body.position.y = 5;
body.quaternion.setFromEuler(Math.PI / 3,Math.PI / 3,Math.PI / 3);
world.addBody(body);


const planeMaterial1 = new CANNON.Material();
const groundBody = new CANNON.Body({
  shape: new CANNON.Plane(),
  mass:0,
  material:planeMaterial1,
});

groundBody.quaternion.setFromEuler(-Math.PI / 2,0,0);
world.addBody(groundBody);

const contactMaterial = new CANNON.ContactMaterial(planeMaterial1,cubeMaterial,{
  restitution:0.7,
});
world.addContactMaterial(contactMaterial);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  world.step(1 / 60);
  // 周步物理小球与网格小球
  mesh.position.copy(body.position);
  // 同步箱子与网格模型同步
  mesh.quaternion.copy(body.quaternion);
  // sphere.position.copy(body.position);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
