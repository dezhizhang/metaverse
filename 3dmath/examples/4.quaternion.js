/*
 * :file description: 
 * :name: /3dmath/examples/4.quaternion.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-30 15:31:04
 * :last editor: 张德志
 * :date last edited: 2025-03-30 15:34:54
 */
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机的位置
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),Math.PI / 4);

cube.quaternion.multiplyQuaternions(quaternion,cube.quaternion);



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
