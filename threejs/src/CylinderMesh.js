/*
 * :file description:
 * :name: /threejs/src/CylinderMesh.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-04 19:45:09
 * :last editor: 张德志
 * :date last edited: 2024-04-04 19:55:31
 */
import * as THREE from 'three';

const geometry = new THREE.CylinderGeometry(1, 1, 1, 6);
geometry.computeVertexNormals();
geometry.rotateX(Math.PI / 2);
geometry.translate(0, 0, 0.5);

function CylinderMesh(x, y, size, height, color) {
  const material = new THREE.MeshLambertMaterial({
    color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, 0);
  mesh.scale.set(size, size, height);
  return mesh;
}

export { CylinderMesh };
