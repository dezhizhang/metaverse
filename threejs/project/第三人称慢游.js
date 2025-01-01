import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff));
scene.add(new THREE.GridHelper(30, 25, 0x004444, 0x004444));

const keyStates = {
  W: false,
  A: false,
  S: false,
  D: false,
};

let leftButtonBool = false;

window.addEventListener("keydown", (event) => {
  console.log('event.code',event.code === "KeyA")
  if (event.code === "KeyW") keyStates.W = true;
  if (event.code === "KeyA") keyStates.A = true;
  if (event.code === "KeyS") keyStates.S = true;
  if (event.code === "KeyD") keyStates.D = true;
});

window.addEventListener("keyup", (event) => {
  if (event.code === "KeyW") keyStates.W = false;
  if (event.code === "KeyA") keyStates.A = false;
  if (event.code === "KeyS") keyStates.S = false;
  if (event.code === "KeyD") keyStates.D = false;
});

const group = new THREE.Group();
const cameraGroup = new THREE.Group();
const loader = new GLTFLoader();
loader.load("/人.glb", (gltf) => {
  group.add(gltf.scene);
});
camera.position.set(0, 1.6, -5.3);
camera.lookAt(0, 1.6, 0);
cameraGroup.add(camera);
group.add(cameraGroup);
scene.add(group);

const angleMin = THREE.MathUtils.degToRad(-15);
const angleMax = THREE.MathUtils.degToRad(15);


window.addEventListener("mousedown", () => {
  leftButtonBool = true;
  document.body.requestPointerLock();
});

window.addEventListener("click", () => {
  document.exitPointerLock();
});

window.addEventListener("mousemove", (event) => {
  if (document.pointerLockElement === document.body) {
    group.rotation.y -= event.movementX / 600;
    cameraGroup.rotation.x -= event.movementY / 600;

    if(cameraGroup.rotation.x < angleMin) cameraGroup.rotation.x = angleMin;
    if(cameraGroup.rotation.x > angleMax) cameraGroup.rotation.x = angleMax;
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.updateProjectionMatrix();
});

const clock = new THREE.Clock();
const v = new THREE.Vector3(0, 0, 0);
const speed = 12;
const vMax = 5;
// 阻尼系数
const damping = -0.04;

function render() {
  controls.update();
  const deltaTime = clock.getDelta();

  if (keyStates.W) {
    const front = new THREE.Vector3(0,0,0);
    group.getWorldDirection(front);
    if (v.length() < vMax) {
      v.add(front.multiplyScalar(speed * deltaTime));
    }
  }

  if (keyStates.S) {
    const front = new THREE.Vector3(0,0,0);
    group.getWorldDirection(front);
    if (v.length() < vMax) {
      v.add(front.multiplyScalar(-speed * deltaTime));
    }
  }

  if(keyStates.A) {
    const front = new THREE.Vector3(0,0,0);
    const up = new THREE.Vector3(0,1,0);
    group.getWorldDirection(front);
    const left = up.clone().cross(front);
    if(v.length() < vMax) {
      v.add(left.multiplyScalar(speed * deltaTime))
    }
  }
 
  if(keyStates.D) {
    const front = new THREE.Vector3(0,0,0);
    const up = new THREE.Vector3(0,1,0);
    group.getWorldDirection(front);
    const left = front.cross(up);
    if(v.length() < vMax) {
      v.add(left.multiplyScalar(speed * deltaTime))
    }
  }

  //v = v * (1 - 0.04) = v * (1 + damping) = v + v * damping
  v.addScaledVector(v, damping); // 通过阻尼系数，对速度进行减速
  const deltaPos = v.clone().multiplyScalar(deltaTime);
  group.position.add(deltaPos); // 更新玩家角色的位置

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

