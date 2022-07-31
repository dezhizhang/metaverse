/*
 * :file description: 
 * :name: /threejs/examples/粒子几何体/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-30 22:33:11
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import Stats from 'stats.js';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

function initStats() {
    const stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('stats').appendChild(stats.domElement);
    return stats;
}

const stats = initStats();

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 150;

const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);


function createSprites() {
    const material = new THREE.SpriteMaterial();

    for(let i=-5;i < 5;i++) {
        for(let j=-5;j < 5;j++) {
            let sprite = new THREE.Sprite(material);
            sprite.position.set(i * 10,j * 10,0);
            scene.add(sprite);

        }
    }
}

createSprites();

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();


