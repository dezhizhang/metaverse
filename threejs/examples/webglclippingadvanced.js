import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;
const params = {
	clipIntersection:true,
	planeConstant:0,
	showHelpers:false
}

const clippingPlanes = [
	new THREE.Plane(new THREE.Vector3(1,0,0),0),
	new THREE.Plane(new THREE.Vector3(0,-1,0),0),
	new THREE.Plane(new THREE.Vector3(0,0,-1),0)
];

init();

function init() {
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.localClippingEnabled = true;
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(40,window.innerWidth / window.innerHeight,1,2000);
	camera.position.set(- 1.5, 2.5, 3.0);

	const controls = new OrbitControls(camera,renderer.domElement);
	controls.addEventListener('change',render);
	controls.minDistance = 1;
	controls.maxDistance = 10;
	controls.enablePan = false;

	// 添加灯光
	const light = new THREE.HemisphereLight(0xffffff,0x080808,4.5);
	light.position.set(- 1.25, 1, 1.25);
	scene.add(light);

	const group = new THREE.Group();

	for(let i=1;i <=30;i += 2) {
		const geometry = new THREE.SphereGeometry(i / 30,48,24);
		const material = new THREE.MeshLambertMaterial({
			color:new THREE.Color().setHSL(Math.random(),0.5,0.5,THREE.SRGBColorSpace),
			side:THREE.DoubleSide,
			clippingPlanes:clippingPlanes,
			clipIntersection:params.clipIntersection
		});
		group.add(new THREE.Mesh(geometry,material));
	}
	scene.add(group);

	const helpers = new THREE.Group();
	helpers.add(new THREE.PlaneHelper(clippingPlanes[0],2,0xff0000));
	helpers.add(new THREE.PlaneHelper(clippingPlanes[1],2,0x00ff00));
	helpers.add(new THREE.PlaneHelper(clippingPlanes[2],2,0x0000ff));
	helpers.visible = false;
	scene.add(helpers);

	window.addEventListener('resize',onWindowResize)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth,window.innerHeight);
	render();
}



function render() {
	renderer.render(scene,camera);
	requestAnimationFrame(render)
}

render();


