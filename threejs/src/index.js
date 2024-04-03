/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-03 07:16:14
 * :last editor: 张德志
 * :date last edited: 2024-04-03 23:00:00
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


const geometry = new THREE.BoxGeometry(30,30,30);
const material = new THREE.MeshLambertMaterial({
  color:0x0000ff
});
const box = new THREE.Mesh(geometry,material);
box.position.set(80,0,0);
scene.add(box);

// 获取网络世界坐标
const worldVector = box.position.clone();
const standardVector = worldVector.project(camera);

const a = window.innerHeight / 2;
const b = window.innerHeight / 2;

const x = Math.random(standardVector.x * a + a);
const y = Math.random(-standardVector.y * b + b);

const div = document.createElement('div');
div.innerHTML = '立方体';
div.style.padding = '10px';
div.style.color = '#fff';
div.style.position = 'absolute';
div.style.backgroundColor = 'rgba(25,25,25,0.5)';
div.style.borderRadius = '5px';
document.body.appendChild(div);


div.style.left = x + 'px';
div.style.top = y + 130 + 'px';









const gridHelper = new THREE.GridHelper(200,25,0x004444,0x004444);
gridHelper.position.y = -0.5;
scene.add(gridHelper);




const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);



const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
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
