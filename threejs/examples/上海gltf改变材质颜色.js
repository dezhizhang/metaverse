/*
 * :file description: 
 * :name: /threejs/examples/上海gltf改变材质颜色.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-06 21:06:29
 * :last editor: 张德志
 * :date last edited: 2024-04-06 21:06:30
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,50000);
camera.position.set(-3345,842,406);

camera.lookAt(0,0,0);


camera.lookAt(scene.position);

const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff,1);
directionalLight1.position.set(400,200,300);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff,1);
directionalLight2.position.set(-300,600,-300);
scene.add(directionalLight2);



const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/model/shanghai.glb',(gltf) => {
  const floor = gltf.scene.getObjectByName('地面');
  floor.material = new THREE.MeshLambertMaterial({
    color:0x444433
  });

  const river = gltf.scene.getObjectByName('河面');
  river.material = new THREE.MeshLambertMaterial({
    color:0x336633
  });

  const building = gltf.scene.getObjectByName('楼房');
  building.traverse((obj) => {
    if(obj.type === 'Mesh') {
      obj.material = new THREE.MeshLambertMaterial({
        color:0x00ff00
      })
    }
  });
  scene.add(gltf.scene);
})

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const  control = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;

})


document.body.appendChild(renderer.domElement);

function render() {
  console.log(camera.position);
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();


