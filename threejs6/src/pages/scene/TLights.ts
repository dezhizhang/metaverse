
/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/Tlights.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 21:37:09
 * :last editor: 张德志
 * :date last edited: 2023-01-02 22:23:06
 */

import { AmbientLight, Object3D, PointLight, SpotLight } from 'three';

export const lightsList:Object3D[] = [];

// 平行光
const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',0.3);

// 点光源
export const pointLight:PointLight = new PointLight('rgb(255,255,255)',0.7,200,0.1);
pointLight.position.set(20,20,20);

// 聚光灯
export const spotLight:SpotLight = new SpotLight('rgb(255,255,255)',1,200,Math.PI / 180 * 45,0,0);
spotLight.position.set(-50,50,-50);
spotLight.castShadow = true;

lightsList.push(ambientLight,pointLight,spotLight);
