import * as THREE from 'three';
import { scene, renderer, camera } from './scene.js';

document.body.appendChild(renderer.domElement);

const height = 100;
const radius = 25;

const geometry = new THREE.ConeGeometry(radius,height,4);
geometry.rotateX(-Math.PI / 2);
geometry.translate(0,0,height / 2);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

const mesh2 = mesh.clone();
mesh2.scale.z = 0.5;
mesh2.position.z = height*(1+mesh2.scale.z);
mesh2.rotateX(Math.PI);
scene.add(mesh2);

