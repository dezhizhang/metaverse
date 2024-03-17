/*
 * :file description:
 * :name: /smart-city1/src/mesh/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 15:07:00
 * :last editor: 张德志
 * :date last edited: 2024-03-17 21:42:20
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import scene from '../scene';
import FlyLine from './flyLine';
import Wireframe from './wireframe';
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
        if(item.name === 'Layerbuildings') {
          const meshLine = new Wireframe(item.geometry);
          const size = item.scale.x * 1.0001;
          meshLine.mesh.scale.set(size,size,size);
          scene.add(meshLine.mesh);
          
        }
      }
    });
    
    
    scene.add(gltf.scene);

    const flyline = new FlyLine();
    scene.add(flyline.mesh);    
  });
}
