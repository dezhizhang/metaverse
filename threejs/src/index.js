/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-09-20 07:34:18
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { TextureLoader } from 'three/examples/jsm/loaders/t'
import fragmentShader from './shader/point/fragment.glsl';
import vertexShader from './shader/point/vertex.glsl';


const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0,10);
camera.updateProjectionMatrix();

scene.lookAt(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneGeometry(1,1,64,64);
const material = new THREE.MeshBasicMaterial({
	color:0xff0000,
	side:THREE.DoubleSide
});
material.onBeforeCompile = (shader,fragment) => {
	//#include
	shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>',
		`#include <begin_vertex>
		transformed.x += 2.0;
		transformed.z += 2.0;
		`
	)
	// console.log({shader});
	// console.log({fragment})
}
const plane = new THREE.Mesh(geometry,material);
scene.add(plane);


// const geometry = new THREE.BufferGeometry();
// const positions = new Float32Array([0,0,0]);


// geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));

// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('https://img0.baidu.com/it/u=3708545959,316194769&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500');


// const material = new THREE.ShaderMaterial({
// 	uniforms:{
// 		uTexture:{
// 			value:texture
// 		}
// 	},
// 	vertexShader:vertexShader,
// 	fragmentShader:fragmentShader,
// 	transparent:true,
// })

// const points = new THREE.Points(geometry,material);


// scene.add(points);

const helper = new THREE.AxesHelper(5);
scene.add(helper)

const light = new THREE.AmbientLight();
scene.add(light);


window.addEventListener('resize',onWindowResize);


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
