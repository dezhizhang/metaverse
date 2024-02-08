import * as THREE from 'three';
import { countryLine } from './line.js';
import config from './config.js';

const R = config.R;
const earth = new THREE.Group();
earth.add(createSphereMesh(R));

earth.add(countryLine(R * 1.001));

function createSphereMesh(r) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/earth.jpg');
  const geometry = new THREE.SphereGeometry(r,40,40);

  const material = new THREE.MeshLambertMaterial({
    map:texture,//设置地球0颜色贴图map
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;

}

export { earth };