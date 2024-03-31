/*
 * :file description:
 * :name: /things/src/scene/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:54:14
 * :last editor: 张德志
 * :date last edited: 2024-03-31 19:49:34
 */
import * as THREE from 'three';
import { factory } from './factory';

const scene = new THREE.Scene();

factory().then((gltf) => {
  scene.add(gltf);
});

export default scene;
