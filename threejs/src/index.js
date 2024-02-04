/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-02-04 17:49:12
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.001,1000);
camera.position.set(0,0,10);
scene.add(camera);

const geometry = new THREE.SphereGeometry(100,100,100);
const wireframe = new THREE.WireframeGeometry(geometry);

const light = new THREE.AmbientLight( 0x404040 ); // 柔和的白光
scene.add( light );

const line = new THREE.LineSegments(wireframe);
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;


scene.add(line);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();

document.body.appendChild(renderer.domElement);




