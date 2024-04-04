/*
 * :file description: 
 * :name: /threejs/src/line.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2024-04-04 16:59:06
 */
import * as THREE from 'three';

function Line(pointArrs) {
  const group = new THREE.Group();
  pointArrs.forEach((polygon) => {
    const pointArr = [];
    polygon[0].forEach((elem) => {
      pointArr.push(elem[0],elem[1],0);
    });
    group.add(lineLoop(pointArr))
  });
  return group;
}


function lineLoop(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribue;

  const material = new THREE.LineBasicMaterial({
    color:0xff6655
  });
  return  new THREE.LineLoop(geometry,material);
}

export {
  Line
}