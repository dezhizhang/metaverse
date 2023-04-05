/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TLoadModel.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-03 07:12:16
 * :last editor: 张德志
 * :date last edited: 2023-04-06 05:03:23
 */
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Material, Mesh, MeshStandardMaterial, Object3D } from 'three';
import { frameColorTexture, frameRoughnessTexture,frameDispTexture } from './TTextures';

const url = 'https://tugua.oss-cn-hangzhou.aliyuncs.com/model';

const objLoader: OBJLoader = new OBJLoader();


export const frameMaterial:MeshStandardMaterial = new MeshStandardMaterial({
  map:frameColorTexture,
  roughnessMap:frameRoughnessTexture,
  bumpMap:frameDispTexture
});

export const framePromise = new Promise<Object3D>((resolve,reject) => {
  objLoader.loadAsync(`${url}/frame.obj`).then(group => {
    const frame:Mesh = group.children[0] as Mesh;
    (frame.material as Material).dispose();
    frame.material = frameMaterial;
    
    frame.position.y = 45;
    frame.position.z = -1;
    frame.rotation.y = Math.PI / 180 * -90;
    frame.scale.set(2,2,2)

    resolve(frame);
  }).catch(err => {
    reject(err)
  })
})








