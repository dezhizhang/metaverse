/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-15 05:55:36
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
// scene.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);


const gemetry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	wireframe: true
});

const cubeList = [];

for (let i = -5; i < 5; i++) {
	for (let j = -5; j < 5; j++) {
		for (let z = -5; z < 5; z++) {
			const cube = new THREE.Mesh(gemetry, material);

			cube.position.set(i, j, z);
			cubeList.push(cube);
			scene.add(cube);
		}
	}
}

const mouse = new THREE.Vector2();
// 创建投射对像
const raycaster = new THREE.Raycaster();

window.addEventListener('click', (ev) => {
	mouse.x = ev.clientX / window.innerWidth * 2 - 1;
	mouse.y = -ev.clientY / window.innerHeight * 2 + 1;
	raycaster.setFromCamera(mouse,camera);
	const result = raycaster.intersectObjects(cubeList);
	console.log(result);
	if(result.length) {
		result[0].object.material = new THREE.MeshBasicMaterial({
			color:'#FF0000'
		})
	}
	
});



window.addEventListener('resize', onWindowResize);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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
