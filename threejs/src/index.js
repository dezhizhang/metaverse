/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-04 21:00:05
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';
import vertex from './shader/vertex.glsl';
import fragment from './shader/fragment.glsl';


// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,window.innerWidth / window.innerHeight,0.1,1000
);
camera.position.set(0,0,10);
scene.add(camera);

const cubeGeometey = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshStandardMaterial();
const cube = new THREE.Mesh(cubeGeometey,cubeMaterial);
cube.castShadow = true;
scene.add(cube);

const material = new THREE.MeshBasicMaterial({color:'#00ff00'});

const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader:vertex,
    fragmentShader:fragment
})


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,64,64),
    shaderMaterial
)
// floor.receiveShadow = true;
// floor.position.set(0,-5,0);
// floor.rotation.x = -Math.PI / 2;

scene.add(floor);


// const light = new THREE.AmbientLight(0xffffff,1);
// scene.add(light);

const  pointLight = new THREE.SpotLight(0xffffff,1);
pointLight.position.set(2,2,2);
pointLight.castShadow = true;
pointLight.shadow.radius = 5;
scene.add(pointLight);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
    let deltaTime = clock.getDelta();
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});


