/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-02-21 22:45:10
 */
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

import { STLLoader } from 'three/addons/loaders/STLLoader.js';

let stats;

let camera, cameraTarget, scene, renderer;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(35,window.innerWidth / window.innerHeight,1,1000);
  camera.position.set(3, 0.15, 3);

  cameraTarget =new THREE.Vector3(0, -0.25, 0);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x72645b);
  scene.fog = new THREE.Fog(0x72645b,2, 15);

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshPhongMaterial({
      color: 0xcbcbcb,
      specular: 0x474747
    }),
  )
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;
  scene.add(plane);
  plane.receiveShadow = true;

  const material = new THREE.MeshPhongMaterial({
    color: 0xd5d5d5,
    specular: 0x494949,
    shininess: 200,
  });
  
  const loader = new STLLoader();
  loader.load('https://threejs.org/examples/models/stl/ascii/slotted_disk.stl',function(geometry) {
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(0, -0.25, 0.6);
    mesh.rotation.set(0, -Math.PI / 2, 0);
    mesh.scale.set(0.5, 0.5, 0.5);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);
    
  });


  loader.load('https://threejs.org/examples/models/stl/binary/pr2_head_pan.stl',function(geometry) {
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(0, -0.37, -0.6);
    mesh.rotation.set(-Math.PI / 2, 0, 0);
    mesh.scale.set(2, 2, 2);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    
  });

  loader.load('https://threejs.org/examples/models/stl/binary/pr2_head_tilt.stl',function(geometry) {
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(0.136, -0.37, -0.6);
    mesh.rotation.set(-Math.PI / 2, 0.3, 0);
    mesh.scale.set(2, 2, 2);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    
  });
  loader.load('https://threejs.org/examples/models/stl/binary/colored.stl',function(geometry) {
    let meshMaterial = material;
    if(geometry.hasColors) {
      meshMaterial = new THREE.MeshPhongMaterial({
        opacity: geometry.alpha,
        vertexColors: true
      });
      const mesh = new THREE.Mesh(geometry,meshMaterial);
      mesh.position.set(0.5, 0.2, 0);
      mesh.rotation.set(-Math.PI / 2,Math.PI / 2,0);
      mesh.scale.set(0.3, 0.3, 0.3);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      scene.add(mesh);
    }
  });

  scene.add(new THREE.HemisphereLight(0x8d7c7c,0x494966,3));
  addShadowedLight(1, 1, 1, 0xffffff, 3.5);
  addShadowedLight(0.5, 1, -1, 0xffd500, 3);

  renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);
  
  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener('resize',onWindowResize);

}



function addShadowedLight(x, y, z, color, intensity) {
  const directionalLight = new THREE.DirectionalLight(color, intensity);
  directionalLight.position.set(x, y, z);
  scene.add(directionalLight);

  directionalLight.castShadow = true;

  const d = 1;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4;

  directionalLight.shadow.bias = -0.002;
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
  const timer = Date.now() * 0.0005;

  camera.position.x = Math.cos(timer) * 3;
  camera.position.z = Math.sin(timer) * 3;

  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);
}
