/*
 * :file description: 
 * :name: /threejs/examples/136渲染多个立方体.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 08:58:01
 * :last editor: 张德志
 * :date last edited: 2024-12-22 08:58:02
 */
import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);



const stats = new Stats();

document.body.appendChild(stats.domElement);


for(let i=0;i < 10000;i++) {
  const geometry = new THREE.BoxGeometry(10,10,10);
  const material = new THREE.MeshLambertMaterial({
    color:0x00ffff
  });
  const mesh = new THREE.Mesh(geometry,material);
  
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;


  mesh.position.set(x,y,z);
  scene.add(mesh);
}

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

// 添加平行光
const directionLight = new THREE.DirectionalLight(0xffffff,1.0);
directionLight.position.set(50,100,50);


scene.add(new THREE.DirectionalLightHelper(directionLight,5,0xffff00));

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.updateProjectionMatrix();
});


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);