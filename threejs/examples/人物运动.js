/*
 * :file description: 
 * :name: /threejs/examples/人物运动.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-11 07:45:54
 * :last editor: 张德志
 * :date last edited: 2024-04-11 07:45:55
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



//创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(5, 5, 5);
camera.lookAt(scene.position);

const keyStatus = {
  W: false,
  A: false,
  S: false,
  D: false,
};

window.addEventListener('keydown', (event) => {
  const uppperkey = event.key.toLocaleUpperCase();
  keyStatus[uppperkey] = !keyStatus[uppperkey];
});

window.addEventListener('keyup',(event) => {
  const uppperkey = event.key.toLocaleUpperCase();
  keyStatus[uppperkey] = !keyStatus[uppperkey];
});

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);


let mixer = null;
let pserson = null;
gltfLoader.load('/person.glb',(gltf) => {
  scene.add(gltf.scene);
  pserson = gltf.scene;
  mixer = new THREE.AnimationMixer(gltf.scene);
  const clipAction = mixer.clipAction(gltf.animations[12]);
  clipAction.play();

});


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

const clock = new THREE.Clock();
const v = new THREE.Vector3(0,0,3);

function render() {
  const deltaTime = clock.getDelta();
  if(keyStatus.W) {
    const deltaPos = v.clone().multiplyScalar(deltaTime);

    pserson.position.add(deltaPos);
    console.log('w');
  }
  if(mixer) {
    console.log('mixer',mixer);
    mixer.update(deltaTime);
  }

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
