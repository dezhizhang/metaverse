/*
 * :file description: 
 * :name: /threejs/examples/南滴下落动画.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-09 21:38:46
 * :last editor: 张德志
 * :date last edited: 2024-04-09 21:38:55
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(300, 200, 200);
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
const texture1 = new THREE.TextureLoader().load('/grass.jpg');

texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;
texture1.colorSpace = THREE.SRGBColorSpace;
texture1.repeat.set(10,10);

const material = new THREE.MeshLambertMaterial({
  color:0x777700,
  map:texture1,
  side:THREE.DoubleSide,
});

const plane = new THREE.Mesh(geometry,material);
plane.rotateX(-Math.PI / 2);
scene.add(plane);




const texture = new THREE.TextureLoader().load('/rain.png');

const group = new THREE.Group();

for(let i=0;i < 2000;i++) {
  const spriteMaterial = new THREE.SpriteMaterial({
    map:texture
  });

  const sprite = new THREE.Sprite(spriteMaterial);

  sprite.scale.set(8,10,1);
  const k1 = Math.random() - 0.5;
  const k2 = Math.random() - 0.5;

  sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2);
  group.add(sprite);
}
scene.add(group);

const clock = new THREE.Clock();

function render() {
  const t = clock.getDelta();
  requestAnimationFrame(render);
  group.children.forEach((sprite) => {
    sprite.position.y -= t * 50;
    if(sprite.position.y < 0) {
      sprite.position.y = 200;
    }
  })
  renderer.render(scene, camera);
}

render();