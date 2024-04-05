/*
 * :file description: 
 * :name: /threejs/examples/自定义变量.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-05 22:22:47
 * :last editor: 张德志
 * :date last edited: 2024-04-05 22:22:49
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

const size = new Float32Array([
  1.0,
  0.8,
  0.6,
  0.4,
  0.2,
]);


geometry.attributes.position = new THREE.BufferAttribute(vertices,3);
geometry.attributes.size = new THREE.BufferAttribute(size,1);

const vertexShader = `
  attribute float size;
  void main() {
    gl_PointSize = size * 10.0;
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
  side:THREE.DoubleSide,
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
