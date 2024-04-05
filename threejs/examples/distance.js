/*
 * :file description: 
 * :name: /threejs/examples/distance.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-05 21:53:17
 * :last editor: 张德志
 * :date last edited: 2024-04-05 21:53:18
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);


const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0,0,0,
  25,0,0,
  50,0,0,
  75,0,0,
  100,0,0
]);

geometry.attributes.position = new THREE.BufferAttribute(vertices,3);

const vertexShader = `
  void main() {
    gl_PointSize = 20.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;
const fragmentShader = `
  void main() {
    float r = distance(gl_PointCoord,vec2(0.5,0.5));
    if(r < 0.5) {
      gl_FragColor = vec4(0.0,1.0,1.0,1.0);
    }else {
      discard;
    }
  }
`;


const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,

});

const points = new THREE.Points(geometry,material);
scene.add(points);


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
