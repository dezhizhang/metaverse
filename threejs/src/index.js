/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-17 20:20:09
 */
import * as THREE from 'three';
import * as CONNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const clock = new THREE.Clock();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 18);
// scene.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

const plane = new THREE.PlaneGeometry(1,1,64,64);


const material = new THREE.ShaderMaterial({
	vertexShader:`
		void main() {
			gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
		}
	`,
	fragmentShader:`
		void main() {
			gl_FragColor = vec4(1.0,0.0,0.0,1.0);
		}
	`

})


const floor = new THREE.Mesh(plane,material);
scene.add(floor);



const helper = new THREE.AxesHelper(5);
scene.add(helper)




window.addEventListener('resize',onWindowResize);

function render() {
	requestAnimationFrame(render);


	renderer.render(scene, camera);
}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

render();
