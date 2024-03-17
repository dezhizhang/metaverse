/*
 * :file description:
 * :name: /smart-city/src/mesh/city/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 15:07:00
 * :last editor: 张德志
 * :date last edited: 2024-03-17 19:39:37
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import scene from '../../scene';
import FlyLine from './flyLine';
import modifyMaterial from './modifyMaterial';

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/city.glb', (gltf) => {
    gltf.scene.traverse((item) => {
      if (item.type === 'Mesh') {
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e6f),
        });
        item.material = material;
        modifyMaterial(item);
      }
    });
    
    scene.add(gltf.scene);

    const flyline = new FlyLine();
    scene.add(flyline.mesh);
    
  });
}
