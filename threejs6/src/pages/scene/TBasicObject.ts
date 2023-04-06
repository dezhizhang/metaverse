/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TBasicObject.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-02 20:34:14
 * :last editor: 张德志
 * :date last edited: 2023-04-07 06:43:46
 */

import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  Color,
} from 'three';
import { pictureTexture } from './TTextures';

export const basicObjectList:Object3D[] = [];

const stage:Mesh = new Mesh(
  new BoxGeometry(600,10,400),
  new MeshStandardMaterial({
    color:'rgb(0,75,75)',
    roughness:0
  })
)
stage.castShadow = true;
stage.receiveShadow = true;
stage.position.y = -5;


// 图片
const preture:Mesh = new Mesh(
  new PlaneGeometry(192,108),
  new MeshStandardMaterial({
    map:pictureTexture
  })
)
preture.position.y = 120;
preture.position.z = -70;
preture.scale.set(0.3,0.3,0.3);


// 墙面
export const well:Mesh = new Mesh(
  new BoxGeometry(600,200,10),
  new MeshStandardMaterial({
    color:'rgb(255,255,255)'
  })
)
well.position.y = 100;
well.position.z = -80;

well.updateMatrix();
well.updateMatrixWorld();

well.addEventListener('mouseenter',() => {
  (well.material as MeshStandardMaterial).color = new Color('rgb(255,0,0)');
});

well.addEventListener('mousemove',() => {
  console.log('mousemove')
});
well.addEventListener('mouseleave',() => {
  (well.material as MeshStandardMaterial).color = new Color('rgb(255,255,255)');
})


basicObjectList.push(stage,well,preture);







