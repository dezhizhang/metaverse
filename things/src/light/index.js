/*
 * :file description:
 * :name: /things/src/light/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:55:22
 * :last editor: 张德志
 * :date last edited: 2024-03-31 16:59:26
 */
import * as THREE from 'three';
import { ambientLight } from './ambientLight';

const lightGroup = new THREE.Group();
lightGroup.add(ambientLight);

export { lightGroup };
