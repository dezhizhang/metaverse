
/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/TLights.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 21:37:09
 * :last editor: 张德志
 * :date last edited: 2023-04-02 21:06:04
 */


import { AmbientLight, Object3D, PointLight, SpotLight } from 'three';

export const lightsList:Object3D[] = [];

// 环境光
export const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',0.3);

// // 点光源
export const pointLight:PointLight = new PointLight('rgb(255,0,0)',0.7,100,0.1);
pointLight.position.set(20,20,20);



lightsList.push(ambientLight);


