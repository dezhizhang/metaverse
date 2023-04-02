/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TBasicObject.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 20:34:14
 * :last editor: 张德志
 * :date last edited: 2023-04-03 06:33:49
 */

import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderGeometry,
  Object3D,
  PlaneGeometry,
} from 'three';
import { pictureTexture } from './TTextures';

export const basicObjectList:Object3D[] = [];

const stage:Mesh = new Mesh(
  new BoxGeometry(200,10,200),
  new MeshStandardMaterial({
    color:'rgb(150,150,150)',
    roughness:0
  })
)
stage.receiveShadow = true;
stage.position.y = -5;


// 立方体
const box:Mesh = new Mesh(
  new BoxGeometry(20,20,20),
  new MeshStandardMaterial({
    color:'rgb(255,0,0)',
    roughness:0.3,
    metalness:1,
  })  
)
box.castShadow = true;
box.position.y = 10;


// 平面
const plane:Mesh = new Mesh(
  new PlaneGeometry(192,108),
  new MeshStandardMaterial({
    map:pictureTexture
  })
)

plane.position.y = 45;
plane.scale.set(0.3,0.3,0.3);






basicObjectList.push(stage,box,plane);







