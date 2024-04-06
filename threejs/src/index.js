/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-13 22:44:48
 * :last editor: 张德志
 * :date last edited: 2024-04-06 09:19:21
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);

const geometry = new THREE.BoxGeometry(40, 100, 40);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});

material.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    `void main() {`,
    `varying vec3 vPosition;
    void main() {
      vPosition = vec3(modelMatrix * vec4(position,1.0));`,
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    `void main() {`,
    `varying vec3 vPosition;
    void main() {`,
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    `#include <dithering_fragment>`,
    `
    #include <dithering_fragment>
    if(vPosition.y > 20.0 && vPosition.y < 21.0) {
      gl_FragColor = vec4(0.0,1.0,0.0,1.0);
    }
    `,
  );
};

const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 50;
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
