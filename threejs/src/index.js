/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-26 17:43:22
 * :last editor: 张德志
 * :date last edited: 2024-04-26 19:43:04
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.AxesHelper(100));
scene.add(new THREE.AmbientLight(0xffffff, 1));

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(400, 200, 300);
scene.add(pointLight);

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load('/heart/color.png');
const normalTexture = textureLoader.load('/heart/normal.png');
const specularTexture = textureLoader.load('/heart/specular.png');

const textureCube = new THREE.CubeTextureLoader()
  .setPath('/environment/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

const objLoader = new OBJLoader();
objLoader.load('/heart/model.obj', (obj) => {
  const mesh = obj.children[0];
  mesh.scale.set(5, 5, 5);

  const material = new THREE.MeshPhongMaterial({
    map: colorTexture,
    normalMap: normalTexture,
    specularMap: specularTexture,
    envMap: textureCube,
    shininess: 100,
    normalScale: new THREE.Vector2(1, 1),
  });
  mesh.material = material;

  scene.add(obj);
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
