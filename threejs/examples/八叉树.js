/*
 * :file description: 
 * :name: /threejs/examples/八叉树.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-31 06:39:22
 * :last editor: 张德志
 * :date last edited: 2024-12-31 06:39:23
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Octree } from 'three/examples/jsm/math/Octree.js';
import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,3000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);



const renderer = new THREE.WebGLRenderer({
  antialias:true,
  logarithmicDepthBuffer:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


scene.add(new THREE.AxesHelper(100));

const loader = new GLTFLoader();
loader.load('/人.glb',(gltf) =>{
  scene.add(gltf.scene);
  const oct = new Octree();
  oct.fromGraphNode(gltf.scene);
  scene.add(new OctreeHelper(oct));
});

scene.add(new THREE.AmbientLight(0xfffff));
new OrbitControls(camera,renderer.domElement);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();


