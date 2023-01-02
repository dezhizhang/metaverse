/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TBasicObject.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 20:34:14
 * :last editor: 张德志
 * :date last edited: 2023-01-02 21:35:45
 */

import {
  Mesh,
  Object3D,
  BoxGeometry,
  MeshStandardMaterial,
} from 'three';

export const basicObjectList:Object3D[] = [];

const stage:Mesh = new Mesh(
    new BoxGeometry(200,10,200),
    new MeshStandardMaterial({color:'rgb(150,150,150)'})
);

stage.position.y = -5;

const box:Mesh = new Mesh(
    new BoxGeometry(20,20,20),
    new MeshStandardMaterial({color:'red'})
)

box.position.y = 10;

// export const box: Mesh = new Mesh(
//   new BoxGeometry(10, 10, 10),
//   new MeshBasicMaterial({ color: 'rgb(255,255,0)' }),
// );

// box.position.x = -10;

// export const sphere: Mesh = new Mesh(
//   new SphereGeometry(5),
//   new MeshStandardMaterial(),
// );

// sphere.position.x = 10;

// export const cylinder: Mesh = new Mesh(
//   new CylinderGeometry(5,5,10,32,5),
//   new MeshBasicMaterial(),
// );

// cylinder.position.z = 10;

basicObjectList.push(box,stage);



