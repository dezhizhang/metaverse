/*
 * :file description: 
 * :name: /threejs/examples/恢度图转换.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-06 08:52:33
 * :last editor: 张德志
 * :date last edited: 2024-04-06 08:52:34
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const textureLoader = new THREE.TextureLoader();


const geometry = new THREE.SphereGeometry(100,50);

const material = new THREE.MeshLambertMaterial({
  map:textureLoader.load('/earth.png')
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

material.onBeforeCompile = (shader) => {
  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <dithering_fragment>`,
    `#include <dithering_fragment>
      float R = gl_FragColor.r;
      float G = gl_FragColor.g;
      float B = gl_FragColor.b;
      float gray = R*0.3+G*0.59+B*0.11;
      gl_FragColor = vec4(gray,gray,gray,1.0);
    `
  )
}

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
