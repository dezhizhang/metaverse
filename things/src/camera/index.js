/*
 * :file description: 
 * :name: /things/src/camera/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:55:12
 * :last editor: 张德志
 * :date last edited: 2024-03-31 20:50:43
 */
import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(-204, 161, 0.96);
camera.lookAt(0, 0, 0);

export default camera;
