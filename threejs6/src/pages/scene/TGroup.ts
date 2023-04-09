/*
 * :file description:
 * :name: /threejs6/src/pages/scene/TGroup.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-01-04 06:29:03
 * :last editor: 张德志
 * :date last edited: 2023-04-09 14:38:57
 */

import { Group, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three';
import { pictureTexture } from './TTextures';
import { framePromise } from './TLoadModel';

// 图片
const preture: Mesh = new Mesh(
  new PlaneGeometry(192, 108),
  new MeshStandardMaterial({
    map: pictureTexture,
  }),
);
preture.position.y = 120;
preture.position.z = -70;
preture.scale.set(0.3, 0.3, 0.3);

export const groupPromise = new Promise<Group>((resolve, reject) => {
  const group = new Group();

  // 图片
  const preture: Mesh = new Mesh(
    new PlaneGeometry(192, 108),
    new MeshStandardMaterial({
      map: pictureTexture,
    }),
  );

  preture.scale.set(0.3, 0.3, 0.3);

  group.position.y = 120;
  group.position.z = -70;


  group.add(preture);

  framePromise
    .then((frame) => {
      group.add(frame);
      resolve(group);
    })
    .catch((err) => {
      reject(err);
    });
});
