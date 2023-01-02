/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/TLoadModel.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-03 07:12:16
 * :last editor: 张德志
 * :date last edited: 2023-01-03 07:41:57
 */
import { Mesh } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const url = 'https://tugua.oss-cn-hangzhou.aliyuncs.com/model'

const objLoader:OBJLoader = new OBJLoader();
const mtlLoader:MTLLoader = new MTLLoader();


export const framePromise = new Promise((resolve,reject) => {
    mtlLoader.loadAsync(`${url}/frame.mtl`).then((materialCreator) => {
        objLoader.setMaterials(materialCreator).loadAsync(`${url}/frame.obj`).then((group) => {
            resolve(group);
        })
    })
})
