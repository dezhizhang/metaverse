/*
 * :file description:
 * :name: /threejs/src/earth.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-08 15:34:42
 * :last editor: 张德志
 * :date last edited: 2024-02-08 15:42:35
 */
// 引入three.js
import * as THREE from 'three';

const R = 100; // 地球半径

function createSphereMesh(r) {
  // 球体半径
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('earth.jpg'); // 加载纹理贴图
  const geometry = new THREE.SphereGeometry(r, 40, 40);

  const material = new THREE.MeshLambertMaterial({
    map: texture,
  });

  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
const earth = createSphereMesh(R);
export { earth };
