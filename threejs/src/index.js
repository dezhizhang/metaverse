import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(10, 10, 10);
camera.lookAt(scene.position);

scene.add(camera);

const boxGeometry = new THREE.BoxGeometry(1,1,50);
const boxMaterial = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

scene.fog = new THREE.Fog(0x999999,0.1,50);

// scene.fog = new THREE.FogExp2(0x999999,0.1);
scene.background = new THREE.Color(0x999999);







window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
