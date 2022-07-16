/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-16 09:54:05
 */
import * as THREE from 'three';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机
camera.position.set(0,0,10);
scene.add(camera);

for(let i=0;i < 50;i++) {
    const geometry = new THREE.BufferGeometry();
    let positionArray = new Float32Array();
    for(let j=0;j < 9;j++) {
        positionArray[j] = Math.random() * 5;

    }
    let color = new THREE.Color(Math.random(),Math.random(),Math.random())
    geometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3));
    const material = new THREE.MeshBasicMaterial(color);
    const mesh = new THREE.Mesh(geometry,material);    
    
    // 将几何体添加到场影中
    scene.add(mesh);

}

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

renderer.render(scene,camera);


