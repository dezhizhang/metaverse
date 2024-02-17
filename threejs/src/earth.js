/*
 * :file description:
 * :name: /threejs/src/earth.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-08 15:34:42
 * :last editor: 张德志
 * :date last edited: 2024-02-17 21:10:37
 */
import * as THREE from 'three';
import { countryLine } from './line.js';
import { countryMesh } from './countryMesh/index.js';

function createSphereMesh(R) {
  const geometry = new THREE.SphereGeometry(R, 40, 40);
  const material = new THREE.MeshLambertMaterial({
    color: 0x000909,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

// 创建一个地球总对象earthGroup
function createEarth(R) {
  const earthGroup = new THREE.Group(); //地球组对象
  earthGroup.add(createSphereMesh(R));

  const loader = new THREE.FileLoader();
  loader.setResponseType('json');
  loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/world.json', function (data) {
    data.features.forEach(function (country) {
      if (country.geometry.type === 'Polygon') {
        country.geometry.coordinates = [country.geometry.coordinates];
      }
      const line = countryLine(R * 1.002, country.geometry.coordinates);
      const mesh = countryMesh(R * 1.001, country.geometry.coordinates);
      earthGroup.add(line);
      earthGroup.add(mesh);
    });
  });
  return earthGroup;
}

export { createEarth };
