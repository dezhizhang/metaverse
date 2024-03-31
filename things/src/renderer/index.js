/*
 * :file description: 
 * :name: /things/src/renderer/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:55:17
 * :last editor: 张德志
 * :date last edited: 2024-03-31 17:12:30
 */
import * as THREE from 'three';
import camera from '../camera';

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);


window.addEventListener('resize',() => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

})


export default renderer;

