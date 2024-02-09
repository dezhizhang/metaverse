import * as THREE from 'three';

function createSphereMesh(R) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('earth.png');
  const geometry = new THREE.SphereGeometry(R, 40, 40);

  const material = new THREE.MeshLambertMaterial({
    map:texture,//设置地球颜色贴图map
  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;
}


export {createSphereMesh};
