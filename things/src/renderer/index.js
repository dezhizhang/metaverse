/*
 * :file description: 
 * :name: /things/src/renderer/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:55:17
 * :last editor: 张德志
 * :date last edited: 2024-03-31 20:09:32
 */
import * as THREE from 'three';
import camera from '../camera';
import scene from '../scene';

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

window.addEventListener('resize',() => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
};

render();



export default renderer;

