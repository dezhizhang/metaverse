/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TBasicObject.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 20:34:14
 * :last editor: 张德志
 * :date last edited: 2023-04-02 19:42:56
 */

import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderGeometry,
  Object3D,
} from 'three';

export const basicObjectList:Object3D[] = []

export const box:Mesh = new Mesh(
    new BoxGeometry(10,10,10),
    new MeshStandardMaterial({color:'rgb(0,255,255)'})
)

box.position.x = -10;

// 球体
export const sphere:Mesh = new Mesh(
  new SphereGeometry(5),
  new MeshStandardMaterial({color:'rgb(255,0,255)'})
)

sphere.position.x = 10;

// 柱体
export const cylinder:Mesh = new Mesh(
  new CylinderGeometry(5,5,10,32,5),
  new MeshStandardMaterial()
);

cylinder.position.z = -10;

basicObjectList.push(box,sphere,cylinder);







