/*
 * :file description: 
 * :name: /threejs/examples/多面体.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-01 22:18:35
 * :last editor: 张德志
 * :date last edited: 2024-04-01 22:18:36
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(300, 300, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const meshGroup = new THREE.Group();

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


const pointArrs = [
  [
    [0,0],
    [0,50],
    [50,50],
    [50,0],
    [50,0]
  ],
  [
    [60,60],
    [250,30],
    [200,150],
    [20,150],
  ]
];

const shapeArr = [];
pointArrs.forEach((elems) => {
  const vector2Arr = [];
  elems.forEach((elem) => {
    vector2Arr.push(new THREE.Vector2(elem[0],elem[1]));
  });
  const shape = new THREE.Shape(vector2Arr);
  shapeArr.push(shape);
});

const material = new THREE.MeshBasicMaterial({
  color:0x00ffff,
  side:THREE.DoubleSide,
});
const geometry = new THREE.ShapeGeometry(shapeArr);
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);



const controls = new OrbitControls(camera, renderer.domElement);

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
