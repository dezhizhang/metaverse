/*
 * :file description:
 * :name: /things/src/scene/factory.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 19:27:44
 * :last editor: 张德志
 * :date last edited: 2024-03-31 19:54:54
 */
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const model = new THREE.Group();

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('/factory.glb',(gltf) => {
    model.add(gltf.scene);
})

export default model;
