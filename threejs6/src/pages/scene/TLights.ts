
/*
 * :file description: 
 * :name: /threejs6/src/pages/scene/Tlights.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 21:37:09
 * :last editor: 张德志
 * :date last edited: 2023-01-02 22:10:31
 */

import { AmbientLight, Object3D, PointLight } from 'three';

export const lightsList:Object3D[] = [];

const ambientLight:AmbientLight = new AmbientLight('rgb(255,255,255)',0.3);

export const pointLight:PointLight = new PointLight('rgb(255,0,0)',0.7,200,0.1);
pointLight.position.set(20,20,20);

lightsList.push(ambientLight,pointLight);

