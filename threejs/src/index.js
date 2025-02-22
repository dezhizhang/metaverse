/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2025-02-22 14:21:31
 */
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x001111,1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,10000);
camera.position.set(400,400,400);
camera.lookAt(scene.position);


const ambientLight = new THREE.AmbientLight(0xffffff,1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,1.0);
directionalLight.position.set(100,200,200);
scene.add(directionalLight);




const loader = new FBXLoader();
loader.load('/千斤顶.fbx',function(obj) {
  obj.rotateX(Math.PI / 2);
  obj.scale.set(10,10,10);
  obj.position.y = -100;
  scene.add(obj);
  obj.traverse((object) => {
    if(object.type === 'Mesh') {
      object.material = new THREE.MeshStandardMaterial({
        color:object.material.color,
        metalness:1.0,
        roughness:0.5
      })
    }
  })
});




new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(1000));



function render() {
 renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();
