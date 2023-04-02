/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TBasicObject.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 20:34:14
 * :last editor: 张德志
 * :date last edited: 2023-04-02 21:05:45
 */

import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderGeometry,
  Object3D,
} from 'three';

export const basicObjectList:Object3D[] = [];

const stage:Mesh = new Mesh(
  new BoxGeometry(200,10,200),
  new MeshStandardMaterial({color:'rgb(150,150,150)'})
)

stage.position.y = -5;

// 立方体
const box:Mesh = new Mesh(
  new BoxGeometry(20,20,20),
  new MeshStandardMaterial({color:'rgb(255,0,0)'})  
)

box.position.y = 10






basicObjectList.push(stage,box);







