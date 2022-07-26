/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-26 22:01:04
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
// 创建场景
const scene = new THREE.Scene();

// 设置相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 设置渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap = {
    enabled:true
}

// 创建几何体
for(let i=0;i < 50;i++) {
    const geometry = new THREE.BufferGeometry();
    const postionArray = new Float32Array(9);
    for(let j=0;j < 9;j++) {
        postionArray[j] = Math.random() * 5;
    }
    let color = new THREE.Color(Math.random(),Math.random(),Math.random());
    geometry.setAttribute('position',new THREE.BufferAttribute(postionArray,3))
    const material = new THREE.MeshBasicMaterial({color:color});
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
    
}

document.body.append(renderer.domElement);

camera.position.set(0,0,10);
scene.add(camera);


function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);

}


render();
