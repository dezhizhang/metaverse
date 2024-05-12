/*
 * :file description: 
 * :name: /threejs/examples/spotLight聚光灯.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-05-12 21:55:05
 * :last editor: 张德志
 * :date last edited: 2024-05-12 22:03:23
 */
import dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//创建场影
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


// 聚光灯
const spotLight = new THREE.SpotLight(0xfffff,1.0,1000);
scene.add(spotLight);


spotLight.angle = Math.PI / 3;
spotLight.position.set(0,100,0);
spotLight.target.position.set(0,0,0);
scene.add(spotLight.target);


scene.add(new THREE.SpotLightHelper(spotLight,0x00ff00));



const geometry = new THREE.PlaneGeometry(400,200);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI/2);
scene.add(mesh);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);


const controls = new OrbitControls(camera,renderer.domElement);



window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

document.body.append(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
