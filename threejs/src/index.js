import * as THREE from "three";

import Stats from "stats.js";

let stats;

let camera, scene, renderer;

let points;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(27,window.innerWidth / window.innerHeight,5,3500);
	camera.position.z = 2750;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x050505);
	scene.fog = new THREE.Fog(0x050505,2000,3500);

	//
	const particles = 500000;
	const geometry = new THREE.BufferGeometry();
	const arrayBuffer = new ArrayBuffer(particles * 16);
	const interleavedFloat32Buffer = new Float32Array(arrayBuffer);
	const interleavedUint8Buffer = new Uint8Array(arrayBuffer);

	const color = new THREE.Color();
	const n = 1000;
	const n2 = n / 2;

	for(let i=0;i < interleavedFloat32Buffer.length;i+=4) {
		const x = Math.random() * n - n2;
		const y = Math.random() * n - n2;
		const z = Math.random() * n - n2;

		interleavedFloat32Buffer[i + 0] = x;
		interleavedFloat32Buffer[i + 1] = y;
		interleavedFloat32Buffer[i + 2] = z;

		const vx = x / n + 0.5;
		const vy = y / n + 0.5;
		const vz = z / n + 0.5;

		color.setRGB(vx,vy,vz,THREE.SRGBColorSpace);
		const j = (i + 3) * 4;
		
		interleavedUint8Buffer[j + 0] = color.r * 255;
		interleavedUint8Buffer[j + 1] = color.g * 255;
		interleavedUint8Buffer[j + 2] = color.b * 255;
		interleavedUint8Buffer[j + 3] = 0;

	}

	const interleavedBuffer32 = new THREE.InterleavedBuffer(
		interleavedFloat32Buffer,
		4
	);

	const interleavedBuffer8 = new THREE.InterleavedBuffer(
		interleavedUint8Buffer,
		16
	);

	geometry.setAttribute('position',new THREE.InterleavedBufferAttribute(interleavedBuffer32,3,0,false));
	geometry.setAttribute('color',new THREE.InterleavedBufferAttribute(interleavedBuffer8,3,12,true));


	const material = new THREE.PointsMaterial({size:15,vertexColors:true});
	points = new THREE.Points(geometry,material);
	scene.add(points);


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	stats = new Stats();
	document.body.appendChild(stats.dom);

	window.addEventListener('resize',onWindowResize);

}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth,window.innerHeight);
}


function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  const time = Date.now() * 0.001;

  points.rotation.x = time * 0.25;
  points.rotation.y = time * 0.5;

  renderer.render(scene, camera);
}
