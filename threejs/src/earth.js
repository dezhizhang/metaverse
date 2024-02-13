import * as THREE from 'three';

const R = 100;
const earth = createSphereMesh(R);

function createSphereMesh(R) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('earth.png');
  const geometry = new THREE.SphereGeometry(R, 40, 40);
  const material = new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
    opacity: 0.5,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

export { earth };
