import * as THREE from 'three';
import { scene, renderer, camera } from './scene.js';

document.body.appendChild(renderer.domElement);


const height = 100; // 棱锥高度
const radius = 25; // 半径

const geometry = new THREE.ConeGeometry(radius,height,4);
geometry.rotateX(-Math.PI / 2);
geometry.translate(0,0,height / 2);
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const mesh2 = mesh.clone();
mesh2.scale.z = 0.5;
mesh2.position.z = height * (1 + mesh2.scale.z);
mesh2.rotateX(Math.PI);
mesh.add(mesh2);


// 渲染循环
function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();
