/*
 * :file description: 
 * :name: /threejs/examples/css3dsandbox.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-08-30 19:44:14
 * :last editor: 张德志
 * :date last edited: 2023-08-30 19:44:16
 */
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

let camera, scene, renderer;

let scene2, renderer2;

let controls;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,1000);
  camera.position.set(200,200,200);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  scene2 = new THREE.Scene();

  const material = new THREE.MeshBasicMaterial({
    color:0x000000,
    wireframe:true,
    wireframeLinewidth: 1,
    size:THREE.DoubleSide
  });

  for(let i=0;i < 10;i++) {
    const element = document.createElement('div');
    element.style.width = '100px';
    element.style.height = '100px';
    element.style.opacity = i < 5 ? 0.5:1;
    element.style.background = new THREE.Color(Math.random() *  0xffffff).getStyle();

    const object = new CSS3DObject(element);
    object.position.x = Math.random() * 200 - 100;
    object.position.y = Math.random() * 200 - 100;
    object.position.z = Math.random() * 200 - 100;

    object.rotation.x = Math.random();
    object.rotation.y = Math.random();
    object.rotation.z = Math.random();

    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    scene2.add(object);

    const geometry = new THREE.PlaneBufferGeometry(100,100);
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.copy(object.position);
    mesh.rotation.copy(object.rotation);

    mesh.scale.copy(object.scale);
    scene.add(mesh);

  }

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);


  renderer2 = new CSS3DRenderer();
  renderer2.setSize(window.innerWidth,window.innerHeight);
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 0;

  document.body.appendChild(renderer2.domElement);

  controls = new TrackballControls(camera,renderer2.domElement);
  window.addEventListener('resize',onWindowResize);

}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer2.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
  renderer2.render(scene2, camera);
}
