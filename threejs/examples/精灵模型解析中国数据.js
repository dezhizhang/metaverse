/*
 * :file description: 
 * :name: /threejs/examples/精灵模型解析中国数据.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 20:18:23
 * :last editor: 张德志
 * :date last edited: 2024-04-09 20:18:24
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(100, 100, 100);
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

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/sprite.png');

const group = new THREE.Group();


const loader = new THREE.FileLoader();
loader.setResponseType('json');

loader.load('/数据.json',function(data) {
  data.forEach((elem) => {
    const spriteMaterial = new THREE.SpriteMaterial({
      map:texture,
      transparent:true,
      opacity:0.5
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    group.add(sprite);
    const k = elem.value / 200;
    sprite.scale.set(k,k,1);
    sprite.position.set(elem.coordinate[0],elem.coordinate[1],0);
  });
  group.position.set(-110,-30,0);
  scene.add(group);
});



function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
