/*
 * :file description: 
 * :name: /threejs/examples/精灵模型生成树林效果.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 20:54:10
 * :last editor: 张德志
 * :date last edited: 2024-04-09 20:54:16
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(150,150,150);
scene.add(pointLight);

const geometry = new THREE.PlaneGeometry(1000,1000);
const texture = new THREE.TextureLoader().load('/grass.jpg');

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(10,10);

const material = new THREE.MeshLambertMaterial({
  color:0x777700,
  map:texture,
  side:THREE.DoubleSide,
});

const plane = new THREE.Mesh(geometry,material);
plane.rotateX(-Math.PI / 2);
scene.add(plane);

const textureTree = new THREE.TextureLoader().load('/tree.png');
textureTree.colorSpace = THREE.SRGBColorSpace;

for(let i=0;i < 100;i++) {
  const spriteMaterial = new THREE.SpriteMaterial({
    map:textureTree
  });
  const sprite = new THREE.Sprite(spriteMaterial);
 

  sprite.scale.set(100,100,1);
  const k1 = Math.random() - 0.5;
  const k2 = Math.random() - 0.5;

  sprite.position.set(1000 * k1,50,1000 * k2);

  scene.add(sprite);
}


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();