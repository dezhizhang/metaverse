/*
 * :file description: 
 * :name: /threejs/examples/effectComposer/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-04 23:03:28
 * :last editor: 张德志
 * :date last edited: 2025-01-04 23:03:28
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,10);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


scene.add(new THREE.AmbientLight(0xffffff,1.0));



const geometry = new THREE.BoxGeometry(10,10,10);
const material = new THREE.MeshBasicMaterial({
  color:0xff00ff
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const v2 = new THREE.Vector2(window.innerWidth,window.innerHeight);
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(v2,scene,camera);
outlinePass.selectedObjects = [mesh];
composer.addPass(outlinePass);



const constol = new OrbitControls(camera,renderer.domElement);

function render() {
  constol.update();
  composer.render();
  // renderer.render(scene,camera);
  requestAnimationFrame(render)
}

render();

