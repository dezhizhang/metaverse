import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MeshBasicNodeMaterial, vec4, color, positionLocal, mix } from 'three/nodes';
import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js';

let stats;
let camera, scene, renderer;

init().then(animate);

async function init() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	camera = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,1,1000);
	camera.position.set(700,200,-500);

	scene = new THREE.Scene();

	// 灯光
	const light = new THREE.DirectionalLight(0xd5deff);
	light.position.x = 300;
	light.position.y = 250;
	light.position.z = -500;

	scene.add(light);

	// SKYDOME
	const topColor = new THREE.Color().copy(light.color);
	const bottomColor = new THREE.Color(0xffffff);
	const offset = 400;
	const exponent = 0.6;
	
	const h = positionLocal.add(offset).normalize().y;

	const skyMat = new MeshBasicNodeMaterial();
	skyMat.colorNode = vec4(mix(color(bottomColor),color(topColor),h.max(0.0).pow(exponent)),1.0);
	skyMat.side = THREE.BackSide;

	const sky = new THREE.Mesh(new THREE.SphereGeometry(4000,32,15),skyMat);
	scene.add(sky);


	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// controls
	const controls = new OrbitControls(camera,renderer.domElement);
	controls.maxPolarAngle = (0.9 * Math.PI) / 2;
	controls.enableZoom = false;

	// stats
	stats = new Stats();
	document.body.appendChild(stats.dom);

	const loader = new THREE.ObjectLoader();
	const object = await loader.loadAsync('https://threejs.org/examples/models/json/lightmap/lightmap.json');
	scene.add(object);

	window.addEventListener('resize',onWindowResize);

}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth,window.innerHeight);
}


function animate() {
	requestAnimationFrame(animate);
	nodeFrame.update();

	renderer.render(scene,camera);
	stats.update();

}

