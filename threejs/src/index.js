import * as THREE from 'three';
import { renderer, scene } from './scene.js';
import { lon2xyz } from './math.js';

document.body.appendChild(renderer.domElement);


const R = 100;
const height = 100;

const geometry = new THREE.BoxGeometry(10,10,height);

// 经纬度转球面坐标
const sphereCoord = lon2xyz(R, 0, 0);
// 先旋转后平移
geometry.lookAt(new THREE.Vector3(sphereCoord.x,sphereCoord.y,sphereCoord.z));

// 沿着旋转后柱子高度方向平移
const v3 = new THREE.Vector3(sphereCoord.x,sphereCoord.y,sphereCoord.z).normalize().multiplyScalar(R + height / 2);
geometry.translate(v3.x, v3.y, v3.z);

const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const gridHelper = new THREE.GridHelper(300,25,0x004444,0x004444);
gridHelper.position.y = -0.5;
scene.add(gridHelper);



