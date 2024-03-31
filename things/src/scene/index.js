/*
 * :file description:
 * :name: /things/src/scene/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:54:14
 * :last editor: 张德志
 * :date last edited: 2024-03-31 19:55:30
 */
import * as THREE from 'three';
import model from './factory';

const scene = new THREE.Scene();

// 加载模型
scene.add(model);


export default scene;
