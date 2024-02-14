/*
 * :file description: 
 * :name: /threejs/src/Sprite.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-09 10:41:05
 * :last editor: 张德志
 * :date last edited: 2024-02-14 18:03:24
 */
// 引入three.js
import * as THREE from 'three';
import config from './config';

const R = config.R;
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/地球光圈.png');
//  创建精灵材质对象SpriteMaterial
const spriteMaterial = new THREE.SpriteMaterial({
    map: texture, //设置精灵纹理贴图
    transparent: true,//开启透明
    opacity: 0.5,//可以通过透明度整体调节光圈
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(R * 3.0, R * 3.0, 1);

export default sprite;


