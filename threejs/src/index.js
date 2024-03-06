import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js';

let  renderer, scene, camera, controls;



scene = new THREE.Scene();
scene.background = new THREE.Color(0xff00ff)


camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
camera.position.set(-1.8, 0.6, 2.7);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// 后期合成
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(window.innerWidth,window.innerHeight);

//添加渲染通道
const renderPass = new RenderPass(scene,camera);
effectComposer.addPass(renderPass);

// 点效果
const dotScreenPass = new DotScreenPass();
effectComposer.addPass(dotScreenPass);


controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render); // use if there is no animation loop
controls.enableZoom = false;
controls.enablePan = false;
controls.target.set(0, 0, -0.2);
controls.update();

scene.add(new THREE.AmbientLight(0xffffff,3));

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.castShadow = true;
directionalLight.position.set(0,0,200);
scene.add(directionalLight);


const gltfLoader = new GLTFLoader();
gltfLoader.load('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',(gltf) => {
  const mesh = gltf.scene.children[0];
  console.log('mes',mesh);

  scene.add(mesh)
})


window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  requestAnimationFrame(render);
  effectComposer.render(scene, camera);
}

render();


