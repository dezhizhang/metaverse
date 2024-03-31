/*
 * :file description:
 * :name: /things/src/light/directionLight.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 20:31:49
 * :last editor: 张德志
 * :date last edited: 2024-03-31 20:33:02
 */
import * as THREE from 'three';

// 平行光1
const directionLight = new THREE.DirectionalLight(0xffffff, 1);
directionLight.position.set(400, 200, 300);

// 平行光2
const directionLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionLight2.position.set(-400, -200, -300);

export { directionLight, directionLight2 };
