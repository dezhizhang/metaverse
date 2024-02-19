import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight);
camera.position.set(0, 0, 10);
scene.add(camera);

const curve = new THREE.SplineCurve([
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( -5, 5 ),
  new THREE.Vector2( 0, 0 ),
  new THREE.Vector2( 5, -5 ),
  new THREE.Vector2( 10, 0 )
]);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({
  color: 0xff0000
});
const splineObject = new THREE.Line(geometry,material);
scene.add(splineObject);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

