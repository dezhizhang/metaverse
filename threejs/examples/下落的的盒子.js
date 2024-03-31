/*
 * :file description: 
 * :name: /threejs/examples/下落的的盒子.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 21:19:19
 * :last editor: 张德志
 * :date last edited: 2024-03-31 21:19:20
 */
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

// 立方体几何体
const geometry = new THREE.BoxGeometry(10,4,6);
geometry.translate(0,0,0);
const material = new THREE.MeshLambertMaterial({
  map:new THREE.TextureLoader().load('/wood-2.jpg')
});
const cube = new THREE.Mesh(geometry,material);
cube.position.y = 50;
cube.rotation.set(Math.PI / 3,Math.PI / 3,Math.PI / 3);
scene.add(cube);


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
  shape: new CANNON.Box(new CANNON.Vec3(5,2,3))
});
body.position.y = 50;
body.quaternion.setFromEuler(Math.PI / 3,Math.PI / 3,Math.PI / 3);
world.addBody(body);


const planeMaterial1 = new CANNON.Material();
// 创建物理平面
const groundBody = new CANNON.Body({
  shape: new CANNON.Plane(),
  mass:0,
  material:planeMaterial
});

groundBody.quaternion.setFromEuler(-Math.PI / 2,0,0);
world.addBody(groundBody);

const contactMaterial = new CANNON.ContactMaterial(planeMaterial1,cubeMaterial,{
  restitution:0.7
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
  cube.position.copy(body.position);
  // 同步箱子与网格模型同步
  cube.quaternion.copy(body.quaternion);
  // sphere.position.copy(body.position);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
