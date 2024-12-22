/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-12-22 07:51:58
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const geometry = new THREE.BoxGeometry(50,50,50);
const material = new THREE.MeshLambertMaterial({
  color:0x00ff00
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));

const pointLight = new THREE.PointLight(0xffffff,1.0);
pointLight.decay = 0.0;
pointLight.position.set(200,200,200);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight,10);
scene.add(pointLightHelper);

// 添加环境光
const ambient = new THREE.AmbientLight(0xffffff,.4);
scene.add(ambient);

// 添加平行光
const directionLight = new THREE.DirectionalLight(0xffffff,1.0);
directionLight.position.set(50,100,60);
directionLight.target = mesh;


scene.add(new THREE.DirectionalLightHelper(directionLight,5,0xffff00));




controls.addEventListener('change',() => {
  console.log('change');
});

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);

