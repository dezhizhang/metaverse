/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-31 18:45:44
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 


function initStats() {
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById('stats').append(stats.domElement);

    return stats;
    
}

const stats = initStats();

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x00000));
renderer.setSize(window.innerWidth,window.innerHeight);

// 设置相机位置
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 150;



function createSprites() {
    let material = new THREE.SpriteMaterial();
    for(let i=-5;i < 5;i++) {
        for(let j=-5;j < 5;j++) {
            let sprite = new THREE.Sprite(material);
            sprite.position.set(i * 10, j * 10,0);
            scene.add(sprite);
            
        }
    }
}

createSprites();



document.body.append(renderer.domElement);


function render() {
    stats.update();
    requestAnimationFrame(render);
    renderer.render(scene,camera);

}

render();