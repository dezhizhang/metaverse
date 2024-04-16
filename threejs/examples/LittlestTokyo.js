/*
 * :file description: 
 * :name: /threejs/examples/LittlestTokyo.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-16 22:08:37
 * :last editor: 张德志
 * :date last edited: 2024-04-16 22:08:38
 */
import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

let mixer;

const clock = new THREE.Clock();

const stats = new Stats();
document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({
    antialias:true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer),0.04).texture;

const camera = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,1,1000);
camera.position.set(5,2,8);

const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(0,0.5,0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.load('https://threejs.org/examples/models/gltf/LittlestTokyo.glb',(gltf) => {
    const model = gltf.scene;
    model.position.set(1,1,0);
    model.scale.set(0.01,0.01,0.01);
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate();
});

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer.update(delta);

    controls.update();

    stats.update();
    renderer.render(scene,camera);
}

