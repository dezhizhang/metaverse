import * as THREE from 'three';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100,100,100);
const material = new THREE.MeshLambertMaterial({
	color:0x000ff
});

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const directonLight = new THREE.DirectionalLight(0xffffff,0.6);
directonLight.position.set(400,200,300);
scene.add(directonLight);


const directonLight2 = new THREE.DirectionalLight(0xffffff,0.6);
directonLight2.position.set(-400,-200,-300);
scene.add(directonLight2);

// 环境光
const ambientLight = new THREE.AmbientLight(0xfffff,0.6);
scene.add(ambientLight);

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 200;

const camera = new THREE.OrthographicCamera(-s * k,s * k,s,-s,1,1000);
camera.position.set(200,300,200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
	antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width,height);
renderer.setClearColor(0xb9d3ff,1);

document.body.appendChild(renderer.domElement);

renderer.render(scene,camera);



