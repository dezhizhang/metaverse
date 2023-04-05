/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TLoadModel.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-03 07:12:16
 * :last editor: 张德志
 * :date last edited: 2023-04-06 04:49:12
 */
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MeshStandardMaterial } from 'three';
import { frameColorTexture, frameRoughnessTexture,frameDispTexture } from './TTextures';

const url = 'https://tugua.oss-cn-hangzhou.aliyuncs.com/model';

const objLoader: OBJLoader = new OBJLoader();

export const framePromise = objLoader.loadAsync(`${url}/frame.obj`);

export const frameMaterial:MeshStandardMaterial = new MeshStandardMaterial({
  map:frameColorTexture,
  roughnessMap:frameRoughnessTexture,
  bumpMap:frameDispTexture
})

