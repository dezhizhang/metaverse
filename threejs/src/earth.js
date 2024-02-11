import * as  THREE from 'three';
import config  from './config.js';
import {help, flyPath } from './flyPath.js';

const R = config.R;

const earth = new THREE.Group();
earth.add(createSphereMesh(R));
earth.add(help);
earth.add(flyPath);


function createSphereMesh(r) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('earth.png');
  const geometry = new THREE.SphereGeometry(r,40,40);

  const material = new THREE.MeshLambertMaterial({
    color: 0x006666,
    map:texture,
    transparent: true,
    opacity: 0.5, //半透明用于辅助调试
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;

}

export {earth}
