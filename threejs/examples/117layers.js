/*
 * :file description: 
 * :name: /threejs/examples/117layers.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-11 21:05:25
 * :last editor: 张德志
 * :date last edited: 2023-05-11 21:05:26
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-05-11 21:02:28
 */
import * as THREE from 'three';

import Stats from 'stats.js';
import * as dat from "dat.gui";

let stats;
let camera, scene, renderer;

let theta = 0;
const radius = 100;

init();
animate();


function init() {
  camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,1,10000);
  camera.layers.enable(0);
  camera.layers.enable(1);
  camera.layers.enable(2);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  
  // 添加灯光
  const light = new THREE.PointLight(0xffffff,1);
  light.layers.enable(0);
  light.layers.enable(1);
  light.layers.enable(2);

  scene.add(camera);
  camera.add(light);

  const colors = [0xff0000, 0x00ff00, 0x0000ff];
  const geometry = new THREE.BoxGeometry(20,20,20);

  for(let i=0;i < 300;i++) {
    const layer = (i % 3);
    const object = new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:colors[layer]}));
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;

    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;
    
    object.layers.set(layer);
    scene.add(object);

  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  const layers = {

    'toggle red': function () {

      camera.layers.toggle(0);

    },

    'toggle green': function () {

      camera.layers.toggle(1);

    },

    'toggle blue': function () {

      camera.layers.toggle(2);

    },

    'enable all': function () {

      camera.layers.enableAll();

    },

    'disable all': function () {

      camera.layers.disableAll();

    }

  };

  const gui = new dat.GUI();


  gui.add(layers,'toggle red');
  gui.add(layers,'toggle green');
  gui.add(layers,'toggle blue');
  gui.add(layers,'enable all');
  gui.add(layers,'toggle red')


  window.addEventListener('resize', onWindowResize);

  

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}


function animate() {

  requestAnimationFrame(animate);

  render();
  stats.update();

}

function render() {
  theta += 0.1;
  camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
  camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));

  camera.lookAt(scene.position);

  renderer.render(scene,camera);
  
}
