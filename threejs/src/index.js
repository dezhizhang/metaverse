import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,3000);
camera.position.set(10,10,10);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias:true,
  logarithmicDepthBuffer:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff));
scene.add(new THREE.GridHelper(30,25,0X004444,0X004444));



const keyStates = {
  W:false,
  A:false,
  S:false,
  D:false
}


window.addEventListener('keydown',(event) => {
  if(event.code === 'KeyW') keyStates.W = true;
  if(event.code === 'KeyA') keyStates.A = true;
  if(event.code === 'KeyS') keyStates.S = true;
  if(event.code === 'KeyD') keyStates.D = true;
});

window.addEventListener('keyup',(event) => {
  if(event.code === 'KeyW') keyStates.W = false;
  if(event.code === 'KeyA') keyStates.A = false;
  if(event.code === 'KeyS') keyStates.S = false;
  if(event.code === 'KeyD') keyStates.D = false;
});


const group = new THREE.Group();
const loader = new GLTFLoader();
loader.load('/人.glb',(gltf) => {
  group.add(gltf.scene);
});
scene.add(group);




window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.updateProjectionMatrix();
});

const clock = new THREE.Clock();
const v = new THREE.Vector3(0,0,0);
const speed = 12;
const vMax = 5;
// 阻尼系数
const damping = -0.04;

function render() {
  controls.update();
  const deltaTime = clock.getDelta();

  if(keyStates.W) {
    const front = new THREE.Vector3(0,0,1);
    // 速度变化量
    front.multiplyScalar(speed * deltaTime);
    // 当前速度加上速度的变化量
   
    if(v.length() < vMax) {
      v.add(front.multiplyScalar(speed * deltaTime));
    }
  }

  //v = v * (1 - 0.04) = v * (1 + damping) = v + v * damping
  v.addScaledVector(v,damping); // 通过阻尼系数，对速度进行减速
  const deltaPos = v.clone().multiplyScalar(deltaTime);
  group.position.add(deltaPos); // 更新玩家角色的位置


  renderer.render(scene,camera);
  requestAnimationFrame(render)
}

render();

