/*
 * :file description: 
 * :name: /threejs/examples/6.adapter.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-15 22:50:46
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机的位置
camera.position.set(0,0,10);
scene.add(camera);

//创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

cube.scale.set(1,2,1);
cube.rotation.set(1,1,1);
scene.add(cube);

//创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;


// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

document.body.append(renderer.domElement);

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
});

window.addEventListener('dblclick',() => {
    debugger;
    const fullscreenElement = document.fullscreenElement;
    if(!fullscreenElement) {
        renderer.domElement.requestFullscreen();
        return
    }

    document.exitFullscreen();
    
})

const clock = new THREE.Clock();

gsap.to(cube.position,{x:5,duration:5,repeat:-1});
gsap.to(cube.rotation,{x:2 * Math.PI,duration:5,repeat:-1})


function render() {
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();






