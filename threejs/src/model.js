import * as THREE from 'three';

let model = new THREE.Group();

const shape = new THREE.Shape([
  new THREE.Vector2(0, 0),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(60, 80),
  new THREE.Vector2(40, 120),
  new THREE.Vector2(-20, 80),
]);

const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry,material);
model.add(mesh);

export {
  model
}
