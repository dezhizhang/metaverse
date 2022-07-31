/*
 * :file description: 
 * :name: /threejs/examples/粒子几何体/4.加载模型.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-31 20:53:15
 * :last editor: 张德志
 * :date last edited: 2022-07-31 20:53:16
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import spriteSheet from '../assets/textures/particles/sprite-sheet.png';

let group;
let step = 0;
// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth,window.innerHeight);

// 设置相机的位置
camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 150;

document.body.append(renderer.domElement);


function getTexture() {
    let texture = new THREE.ImageUtils.loadTexture(spriteSheet);
    return texture;
}

function createSprite(size, transparent, opacity, color, spriteNumber, range){
    let spriteMaterial = new THREE.SpriteMaterial({
        opacity,
        color,
        transparent,
        map:getTexture,
    });
    spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.depthTest = false;

    spriteMaterial.blending = THREE.AdditiveBlending;

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
    sprite.velocityX = 5;
    return sprite;
    
}


function createSprites() {
    group = new THREE.Object3D();
    let range = 200;
    for(let i=0;i < 400;i++) {
        group.add(createSprite(10,false,0.6,0xffffff, i % 5,range));
    }
    scene.add(group);

}

createSprites();


function render() {
    step += 0.01;
    group.rotation.x = step;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();