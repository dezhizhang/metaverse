/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-04-27 19:44:18
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,1000);
camera.position.set(200,200,200);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

scene.add(new THREE.AxesHelper(100));

scene.add(new THREE.AmbientLight(0xffffff));


const geometry = new THREE.BoxGeometry(60,100,60);
const material = new THREE.MeshLambertMaterial({
  color:0x009999,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/红豆.png');

const spriteMaterial = new THREE.SpriteMaterial({
  map:texture
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(40,40,1);
sprite.position.copy(mesh.position);
sprite.position.y += 80;
scene.add(sprite);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

