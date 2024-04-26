/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-04-26 17:18:45
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff,1));

let mixer;

const fbxLoader = new FBXLoader();
fbxLoader.load('/sambaDancing.fbx',(obj) => {

  console.log(obj);
  obj.scale.set(0.5,0.5,0.5);
  // 解析动画
  mixer = new THREE.AnimationMixer(obj);
  const animations = mixer.clipAction(obj.animations[0]);
  animations.play();

  scene.add(obj);

})



const clock = new THREE.Clock();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);

  if(mixer) {
    mixer.update(clock.getDelta());
  }
}

render();



