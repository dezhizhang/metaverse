/*
 * :file description: 
 * :name: /threejs/examples/加载人物.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-05 06:36:48
 * :last editor: 张德志
 * :date last edited: 2024-03-05 06:36:50
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const baseUrl = 'https://threejs.org/examples'

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
const mapColor = textureLoader.load(`${baseUrl}/models/gltf/LeePerrySmith/Map-COL.jpg`);

const normalMap = textureLoader.load(`${baseUrl}/models/gltf/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg`);


const meshStandardMaterial = new THREE.MeshStandardMaterial({
	map:mapColor,
	normalMap:normalMap,
	side:THREE.DoubleSide,
});


meshStandardMaterial.onBeforeCompile = function(shader) {
  console.log(shader.vertexShader);

  shader.vertexShader =shader.vertexShader.replace(
    '#include <common>',
    `
    #include <common>
    mat2 rotate2d(float _angle){
      return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
    }
    `
  );

  shader.vertexShader = shader.vertexShader.replace(
    '#include <beginnormal_vertex>',
    `
    #include <beginnormal_vertex>
    float angle = position.y * 0.5;
    mat2 rotateMatrix = rotate2d(angle);
    objectNormal.xz = rotateMatrix * objectNormal.xz;
    `
    
    )


  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
    #include <begin_vertex>
    // float angle = transformed.y * 0.5;
    // mat2 rotateMatrix = rotate2d(angle);
    transformed.xz = rotateMatrix * transformed.xz;
    `
  );

}

const loader = new GLTFLoader();
loader.load('https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb',(gltf) => {
	const mesh = gltf.scene.children[0];
	mesh.material = meshStandardMaterial;
  mesh.castShadow = true;
	scene.add(mesh);
})


const plane = new THREE.Mesh(planeGeometry,meshBasicMaterial);
plane.position.set(0,0,-6);
plane.castShadow = true;
plane.receiveShadow = true;

scene.add(plane);


const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);



window.addEventListener('resize',() => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth,window.innerHeight);
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
