/*
 * :file description: 
 * :name: /smart-city/src/renderer.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 11:38:13
 * :last editor: 张德志
 * :date last edited: 2024-03-17 11:38:15
 */
import * as THREE from 'three';

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


export default renderer;
