import * as THREE from 'three';
import Stats from 'stats.js';

let container, stats;

let camera, scene, renderer;

let points;

init();
animate();

function init() {
	container = document.getElementById('container');

	camera = new THREE.PerspectiveCamera(27,window.innerWidth / window.innerHeight,0.1,3500);
	camera.position.z = 2750;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x050505);
	scene.fog = new THREE.Fog(0x050505,2000,3500);

	const particles = 500000;

	const geometry = new THREE.BufferGeometry();
	const positions = [];
	const colors = [];
	const color = new THREE.Color();

	const n = 1000;
	const n2 = n / 2;

	for(let i=0;i < particles;i++) {
		const x = Math.random() * n - n2;
		const y = Math.random() * n - n2;
		const z = Math.random() * n - n2;

		positions.push(x,y ,z);

		const vx = (x / n ) + 0.5;
		const vy = (y / n ) + 0.5;
		const vz = (z / n ) + 0.5;
		
		color.setRGB(vx,vy,vz,THREE.SRGBColorSpace);
		colors.push(color.r,color.g,color.b);

	}

	geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
	geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));

	geometry.computeBoundingSphere();

	const material = new THREE.PointsMaterial({ size: 15, vertexColors: true});

	points = new THREE.Points(geometry,material);
	scene.add(points);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);

	container.appendChild(renderer.domElement);

	stats = new Stats();

	container.appendChild(stats.dom);

	window.addEventListener('resize',onWindowResize);

}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	const time = Date.now() * 0.001;

	points.rotation.x = time * 0.25;
	points.rotation.y = time * 0.5;

	renderer.render( scene, camera );

}