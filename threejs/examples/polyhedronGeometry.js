/*
 * :file description: 
 * :name: /threejs/examples/polyhedronGeometry.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-04 16:30:03
 * :last editor: 张德志
 * :date last edited: 2024-02-04 16:30:04
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.01,1000);
camera.position.set(0,0,10);
scene.add(camera);

const verticesOfCube = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
    -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
];

const indicesOfFaces = [
    2,1,0,    0,3,2,
    0,4,7,    7,3,0,
    0,1,5,    5,4,0,
    1,2,6,    6,5,1,
    2,3,7,    7,6,2,
    4,5,6,    6,7,4
];

const geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 6, 2 );
const mesh = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial());
scene.add(mesh);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene,camera);
}

render();

document.body.appendChild(renderer.domElement);