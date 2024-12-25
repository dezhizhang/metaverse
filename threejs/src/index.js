/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-26 06:14:12
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

camera.position.set(-1.23, 25.19, 53.53);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer:true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

const textureCube = new THREE.CubeTextureLoader()
  .setPath("/environment/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('/starry-deep-outer-space-galaxy.jpg');
texture.colorSpace = THREE.SRGBColorSpace;

const loader = new GLTFLoader();
loader.load("/收费站.glb", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.traverse(function (obj) {
    if (obj.isMesh) {
      obj.material.envMap = textureCube;
      obj.material.envMapIntensity = 3.0;
    }
  });

  const sphereMesh = gltf.scene.getObjectByName('球体');
  sphereMesh.material = new THREE.MeshPhysicalMaterial({
    metalness:0.0,
    roughness:0.0,
    envMapIntensity:1.0,
    transmission:1.0,
    ior:1.5,
  })


  const geometry = new THREE.SphereGeometry(300);
  const material = new THREE.MeshBasicMaterial({
    // color:0x00ff00,
    side:THREE.BackSide,
    map:texture,
  });
  const mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);
});



const rgbLoader = new RGBELoader();
rgbLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
    envMap.mapping = THREE.EquirectangularRefractionMapping;
    scene.environment = envMap;
    scene.background = envMap;
});






function render() {
  controls.update();
  requestAnimationFrame(render);
  console.log(camera.position);
  renderer.render(scene, camera);
}

render();
