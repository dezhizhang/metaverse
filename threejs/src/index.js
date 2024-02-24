// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
// camera.position.set(0,0,10);
// scene.add(camera);

// // 导入纹理
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('./01.jpg');


// const cubeGeometry = new THREE.BoxGeometry(1,1,1);
// const cubeMaterial = new THREE.MeshBasicMaterial({
//   // color:0xff00ff,
//   map:texture,
//   side:THREE.DoubleSide
// });

// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
// scene.add(cube);


// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth,window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);

// const controls = new OrbitControls(camera,renderer.domElement);

// function render() {
//   requestAnimationFrame(render);
//   renderer.render(scene,camera);

// }

// render();

// document.body.appendChild(renderer.domElement);
