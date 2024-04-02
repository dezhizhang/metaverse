/*
 * :file description:
 * :name: /threejs/src/ExtrudeMesh.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-02 23:06:51
 * :last editor: 张德志
 * :date last edited: 2024-04-03 06:47:06
 */
import * as THREE from 'three';


function ExtrudeMesh(pointArrs, height) {
  const shapeArr = [];
  pointArrs.forEach((pointArr) => {
    const vector2Arr = [];
    pointArr[0].forEach((elem) => {
      vector2Arr.push(new THREE.Vector2(elem[0], elem[1]));
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  const material = new THREE.MeshLambertMaterial({
    color: 0x004444,
  });
  const geometry = new THREE.ExtrudeGeometry(shapeArr,{
    depth: height,
    bevelEnabled: false,
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;
}

export { ExtrudeMesh };
