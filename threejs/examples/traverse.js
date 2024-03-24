/*
 * :file description: 
 * :name: /threejs/examples/traverse.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 10:48:40
 * :last editor: 张德志
 * :date last edited: 2024-03-24 10:48:41
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera,renderer.domElement);

const group = new THREE.Group();
group.name = "高层"
for(let i=0;i < 5;i++) {
  const geometry = new THREE.BoxGeometry(20,60,10);
  const material = new THREE.MeshLambertMaterial({
    color:0x000fff
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.name = i + 1 + '号楼';
  mesh.position.x = i * 30;
  group.add(mesh);
};

group.position.y = 30;

const group1 = new THREE.Group();
group.name = "洋房";
for(let i=0;i < 5;i++) {
  const geometry = new THREE.BoxGeometry(20,30,10);
  const material = new THREE.MeshLambertMaterial({
    color:0x000fff
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.name = i + 6 + '号楼';
  mesh.position.x = i * 30;
  group1.add(mesh);
}

group1.position.z = 30;
group1.position.y = 15;


scene.add(group,group1);


scene.traverse((child) => {
  if(child.isMesh) {
    child.material.color = new THREE.Color(0x00ff00);
    console.log(' child.name', child.name);
  }
})





function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
