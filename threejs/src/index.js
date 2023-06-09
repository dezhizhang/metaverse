/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-09 21:06:48
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragmentShader from './shader/fragment.glsl';
import vertexShader from './shader/vertex.glsl';


// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,window.innerWidth / window.innerHeight,0.1,1000
);
camera.position.set(0,0,10);
scene.add(camera);

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array([0,0,0]);
geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));

// 点材质
// const material = new THREE.PointsMaterial({
//     color:0xff0000,
//     size:10,
//     sizeAttenuation:true
// });

const material = new THREE.ShaderMaterial({
    fragmentShader:fragmentShader,
    vertexShader:vertexShader
})

const points = new THREE.Points(geometry,material);
scene.add(points);







// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


function render() {
 
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


