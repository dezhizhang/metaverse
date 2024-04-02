/*
 * :file description:
 * :name: /threejs/src/cityPointMesh.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-03 07:16:56
 * :last editor: 张德志
 * :date last edited: 2024-04-03 07:30:19
 */
import * as THREE from 'three';

function cityPointMesh(size, x, y) {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/贴图.png');
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x004444,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(size, size, size);
  mesh.position.set(x, y, 0);
  return mesh;
}

export { cityPointMesh };
