/*
 * :file description:
 * :name: /things/src/light/ambientLight.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:57:03
 * :last editor: 张德志
 * :date last edited: 2024-03-31 16:58:42
 */
import * as THREE from 'three';

const ambientLight = new THREE.AmbientLight(0xffffff, 1);

export { ambientLight };
