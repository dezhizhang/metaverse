/*
 * :file description: 
 * :name: /threejs/examples/uniform传值.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-05 16:53:49
 * :last editor: 张德志
 * :date last edited: 2024-04-05 16:53:51
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(scene.position);

const vertexShader = `
 void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
 }
`;

const fragmentShader = `
uniform float opacity;
uniform vec3 color;
 void main() {
  gl_FragColor = vec4(color,opacity);
 }
`;

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  transparent: true,
  // opacity: 0.3,
  uniforms:{
    opacity:{
      value:0.3,
    },
    color:{
      value: new THREE.Color(0x00ffff)
    }
  }
});
planeMaterial.uniforms.opacity.value = 1.0;
planeMaterial.uniforms.color.value = new THREE.Color(0x00ff00);


const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
