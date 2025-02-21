/*
 * :file description: 
 * :name: /threejs/examples/将模型转换成线框.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-21 08:04:10
 * :last editor: 张德志
 * :date last edited: 2025-02-21 08:04:11
 */

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(300, 300, 300);
camera.lookAt(scene.position);



const camera2 = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  300000
);
camera.position.set(300, 300, 300);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.localClippingEnabled = true;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AxesHelper(1000));


new OrbitControls(camera,renderer.domElement);


const loader = new GLTFLoader();
loader.load('/建筑模型.gltf',(gltf) => {
  const group = gltf.scene;
  scene.add(group);
  group.traverse(function(child){
    if(child.isMesh) {
      child.material = new THREE.MeshLambertMaterial({
        color:0x00ff00,
        transparent:true,
        opacity:0.7
      });
      const edges = new THREE.EdgesGeometry(child.geometry,1);
      const edgesMaterial = new THREE.LineBasicMaterial({
        color:0x31DEEF
      });
      const line = new THREE.LineSegments(edges,edgesMaterial);
      scene.add(line);
    }
  })
});


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
