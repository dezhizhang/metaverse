import * as THREE from 'three';
import dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

const camera  = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(2,10,2);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/brick/brick_diffuse.jpg');

const planeGeometry = new THREE.PlaneGeometry(1,1);
const planeMaterial = new THREE.MeshBasicMaterial({
  side:THREE.DoubleSide,
  map:texture,
  transparent:true,
});

const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);

// texture.flipY = false;
// texture.premultiplyAlpha = true;

texture.minFilter = THREE.LinearFilter;
texture.colorSpace = THREE.SRGBColorSpace;
texture.minFilter = THREE.LinearMipMapNearestFilter;
texture.anisotropy = 4;



const gui = new dat.GUI();
gui.add(texture,'premultiplyAlpha').name('premultiplyAlpha').onChange(() => {
  texture.needsUpdate = true;
});

scene.add(new THREE.AxesHelper(5));

window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

