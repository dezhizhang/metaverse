import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff00ff);

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(-1.8,0.6,2.7);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// 后期合成
const effectComposer = new EffectComposer(renderer);
effectComposer.setSize(window.innerWidth,window.innerHeight);

// 渲染通道
const renderPass = new RenderPass(scene,camera);
effectComposer.addPass(renderPass);

const dotScreenPass = new DotScreenPass();
effectComposer.addPass(dotScreenPass);

const smaaPass = new SMAAPass();
effectComposer.addPass(smaaPass);

//发光效果
const unrealBloomPass = new UnrealBloomPass();
effectComposer.addPass(unrealBloomPass);




const controls = new OrbitControls(camera,renderer.domElement);
scene.add(new THREE.AmbientLight(0xfffff,3));

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.castShadow = true;
directionalLight.position.set(0,0,200);
scene.add(directionalLight);

const gltfLoader = new GLTFLoader();
gltfLoader.load('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf',(gltf)=> {
  const mesh = gltf.scene.children[0];
  scene.add(mesh);
});

window.addEventListener('resize',onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
}

function render() {
  requestAnimationFrame(render);
  effectComposer.render(scene,camera);

}

render();









