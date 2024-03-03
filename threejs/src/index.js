import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

scene.add(camera);


const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.castShadow = true;
directionalLight.position.set(0,0,200);
scene.add(directionalLight);


const planeGeometry = new THREE.PlaneGeometry(20,20);
const meshBasicMaterial = new THREE.MeshBasicMaterial();



const textureLoader = new THREE.TextureLoader();
const mapColor = textureLoader.load('https://threejs.org/examples/models/gltf/LeePerrySmith/Map-COL.jpg');

const normalMap = textureLoader.load('https://threejs.org/examples/models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg')


const meshStandardMaterial = new THREE.MeshStandardMaterial({
	map:mapColor,
	normalMap:normalMap,
	side:THREE.DoubleSide,
})

const loader = new GLTFLoader();
loader.load('https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb',(gltf) => {
	const mesh = gltf.scene.children[0];
	mesh.material = meshStandardMaterial;
	scene.add(mesh);
})


const plane = new THREE.Mesh(planeGeometry,meshBasicMaterial);
plane.position.set(0,0,-6);
plane.castShadow = true;
scene.add(plane);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);



window.addEventListener('resize',() => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	normalMap.setSize(window.innerWidth,window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

})

const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();
