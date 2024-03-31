/*
 * :file description: 
 * :name: /threejs/examples/Sprite.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 09:58:58
 * :last editor: 张德志
 * :date last edited: 2024-03-31 09:58:58
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 1.5;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(100 * 2,60 * 2,50 * 2);
directionalLight.castShadow = true;
scene.add(directionalLight);


const ambientLight = new THREE.AmbientLight(0xffffff,1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/factory.gltf',(gltf) => {
  scene.add(gltf.scene);
});


const texture = new THREE.TextureLoader().load('/雨滴.png');
const spriteMaterial = new THREE.SpriteMaterial({
  color:0xffffff,
  map:texture,
  transparent:true,
});
const group = new THREE.Group();
for(let i=0;i < 16000;i++) {
 
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(Math.random() * 5,Math.random() * 5,Math.random() * 5);
  const x =window.innerWidth* (Math.random() - 0.5);
  const y = window.innerHeight * Math.random();
  const z = window.innerWidth * (Math.random() - 0.5);
  sprite.position.set(x,y,z);
  group.add(sprite);

}


scene.add(group);



window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  // labelRenderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function loop() {
  group.children.forEach((sprite) => {
    sprite.position.y -= 1;
    if(sprite.position.y < 0) {
      sprite.position.y = 600;
    }
  })
}

function render() {
  requestAnimationFrame(loop)
  // labelRenderer.render(scene,camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
 
}

render();
