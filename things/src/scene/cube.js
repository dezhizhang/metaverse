/*
 * :file description: 
 * :name: /things/src/scene/cube.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 17:18:30
 * :last editor: 张德志
 * :date last edited: 2024-03-31 17:20:44
 */
import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color:0x00ffff
});
const cube = new THREE.Mesh(geometry,material);

export default cube;
