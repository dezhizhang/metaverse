/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-05 05:41:12
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from 'cannon-es';
import vertexShader from './shader/vertex.glsl';
import fragmentShader from './shader/fragment.glsl';




// 创建gui
const gui = new dat.GUI();
// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,window.innerWidth / window.innerHeight,0.1,1000
);
camera.position.set(0,0,10);
scene.add(camera);

const params = {
    uWaresFrequency:{
        value:20.0
    },
    uScale:{
        value:0.1
    },
    
}


const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader:vertexShader,
    fragmentShader:fragmentShader,
    side:THREE.DoubleSide,
    uniforms:{
       ...params
    }
});

// gui.add(params,'uWaresFrequency').min(1).max(100).step(0.1).onChange((value) => {
//     shaderMaterial.uniforms.uWaresFrequency.value = value;
// })

const planGeometey = new THREE.PlaneGeometry(1,1,512,512);
const planMaterial = new THREE.MeshBasicMaterial({color:0xff0000});

const plan = new THREE.Mesh(planGeometey,shaderMaterial);
plan.castShadow = true;
scene.add(plan);




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


