/*
 * :file description:
 * :name: /smart-city/src/camera.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 11:25:41
 * :last editor: 张德志
 * :date last edited: 2024-03-17 15:10:03
 */
import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,50000);
camera.position.set(0,0,10);

export default camera;
