
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-20 23:03:30
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(202,123,125);
camera.lookAt(0,0,0);

const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0x00ffff,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const p = mesh.geometry.attributes.position; // 顶点位置
const n = mesh.geometry.attributes.normal; // 顶点法线

for(let i=0;i < p.count;i++) {
  const m = new THREE.Vector3(p.getX(i),p.getY(i),p.getZ(i));
  const dir = new THREE.Vector3(n.getX(i),n.getY(i),n.getZ(i));
  
  const arrowHelper = new THREE.ArrowHelper(dir,m,10);
  mesh.add(arrowHelper);
}

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);



window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera)
}

render();



