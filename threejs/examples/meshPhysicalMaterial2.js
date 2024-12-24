/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-07-27 12:32:40
 * :last editor: 张德志
 * :date last edited: 2024-12-25 06:15:10
 */
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(scene.position);


const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


const controls = new OrbitControls(camera, renderer.domElement);


const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('/environ/');
const envMapTexture = cubeTextureLoader.load([
    'px.jpg',
    'nx.jpg',
    'py.jpg',
    'ny.jpg',
    'pz.jpg',
    'nz.jpg',
]);
scene.environment = envMapTexture;

scene.add(new THREE.AmbientLight(0xfffff, 1));

const loader = new GLTFLoader();
loader.load('/轿车.glb', (gltf) => {
    const mesh = gltf.scene.getObjectByName('外壳01');
    mesh.material = new THREE.MeshPhysicalMaterial({
        color: mesh.material.color,
        metalness: 0.9,
        envMap: envMapTexture,
        roughness: 0.5,
        envMapIntensity: 2.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    scene.add(gltf.scene);
});





const axhelper = new THREE.AxesHelper(100);
scene.add(axhelper);


function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();


document.body.appendChild(renderer.domElement);