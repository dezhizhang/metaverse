/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-03-16 07:30:09
 */
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const clock = new THREE.Clock();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGL1Renderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0xff33ff,
});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.name = 'cube';
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

const positionKF = new THREE.VectorKeyframeTrack(
  'cube.position',
  [0, 1, 2],
  [0, 0, 0, 2, 0, 0, 4, 0, 0],
);

// 布尔关键帧
const booleanKF = new THREE.BooleanKeyframeTrack(
  'cube.visible',
  [0, 1, 2, 3, 4],
  [true, false, true, false, true],
);

let mixer1;

const mixer = new THREE.AnimationMixer(cube);
const clip = new THREE.AnimationClip('move', 2, [positionKF, booleanKF]);
const action = mixer.clipAction(clip);

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(gltfLoader);

gltfLoader.load('/moon.glb', (gltf) => {
    scene.add(gltf.scene);

    mixer1 = new THREE.AnimationMixer(gltf.scene);

    const booKF = new THREE.BooleanKeyframeTrack('Sketchfab_Scene.visible',[0,1,2,3,4],[true,false,true,false,true]);
    const clip1 = new THREE.AnimationClip('bool',2,[booKF]);
    const action1 = mixer1.clipAction(clip1);
    action1.play();

    
});

const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
console.log('quaternion', quaternion);

action.play();

function render() {
  const delta = clock.getDelta();
  [mixer,mixer1].forEach((item) => {
    if(item) {
        item.update(delta);
    }

  });


  
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
