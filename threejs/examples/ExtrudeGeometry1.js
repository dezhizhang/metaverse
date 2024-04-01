/*
 * :file description: 
 * :name: /threejs/examples/ExtrudeGeometry1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-02 07:22:43
 * :last editor: 张德志
 * :date last edited: 2024-04-02 07:22:44
 */
/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-04-02 07:22:17
 */
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(300, 300, 200);
camera.lookAt(scene.position);




const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);



const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


const arr = [
  [0,0],
  [0,50],
  [50,50],
  [50,0],
  [50,0]
];

const vector2Arr = [];
arr.forEach((elem) => {
  vector2Arr.push(new THREE.Vector2(elem[0],elem[1]))
});

const material = new THREE.MeshLambertMaterial({
  color:0x009999,
  side:THREE.DoubleSide
});
const shape = new THREE.Shape(vector2Arr);
const geometry = new THREE.ExtrudeGeometry(shape,{
  depth:10,
  bevelEnabled:false
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const directionalLight1 = new THREE.DirectionalLight(0xffffff,1);
directionalLight1.position.set(400,200,300);
scene.add(directionalLight1);


const directionalLight2 = new THREE.DirectionalLight(0xffffff,1);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight2);


const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(104, 35, 0);
controls.update();


const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  renderer.render(scene, camera);
  // effectComposer.render();
  requestAnimationFrame(render);
}

render();
