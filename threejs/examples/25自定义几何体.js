/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-11-12 07:20:09
 */
import * as THREE from 'three';
import gsap from "gsap";
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建gui
const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
for(let i = 0;i < 50;i++) {
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(9);
    for(let j = 0;j < 9;j++) {
        positionArray[j] = Math.random() * 5;
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3));
    const colors = new THREE.Color(Math.random(),Math.random(),Math.random())
    const material = new THREE.MeshBasicMaterial({color:colors});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}



// 创建渲染器 
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const clock = new THREE.Clock();




// gui.add(cube.position,'x').min(0).max(5).step(0.01).name("x坐标").onChange((value) => {
//     console.log('value',value);
// }).onFinishChange((value) => {
//     console.log('完全停下来')
// });

// gui.add({color:'#ffff00'},'color').onChange((value) => {
//     cube.material.color.set(value);
// });

// gui.add(cube,'visible').name('是否显示');

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();


window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateWorldMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
})





