/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-25 06:55:21
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

camera.position.set(-1.2398, 25.19, 53.53);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// scene.add(new THREE.AxesHelper(100));

const controls = new OrbitControls(camera, renderer.domElement);

const textureCube = new THREE.CubeTextureLoader()
  .setPath("/environment/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

const loader = new GLTFLoader();
loader.load("/收费站.glb", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      obj.material.envMap = textureCube;
      obj.material.envMapIntensity = 3.0;
    }
  });
});

function render() {
  controls.update();
  requestAnimationFrame(render);
  console.log(camera.position);
  renderer.render(scene, camera);
}

render();
