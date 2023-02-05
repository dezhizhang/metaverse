import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff,0.3);
scene.add(ambient);


// 三维坐标轴
const axesHelper = new THREE.AxesHelper(300);
scene.add(axesHelper);

const model = new THREE.Group();
const geometry = new THREE.CylinderGeometry(50, 50, 20, 40, 1, true);
geometry.translate(0, 10, 0);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //颜色
  side: THREE.DoubleSide, //两面可见
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
scene.add(model);

function plane() {
  const gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
  model.add(gridHelper);
  const geometry = new THREE.PlaneGeometry(310,310);
  const material = new THREE.MeshLambertMaterial({
    color:0xffffff,
    transparent:true,
    opacity:0.1,
    side:THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.y = 1;
  model.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height,1,3000);
camera.position.set(292,233,185);
camera.lookAt(scene.position);


// 创建沉浸对像
const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

window.onresize = function() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();