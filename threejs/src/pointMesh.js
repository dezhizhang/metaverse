/*
 * :file description: 
 * :name: /threejs/src/pointMesh.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-09 17:50:26
 * :last editor: 张德志
 * :date last edited: 2024-02-09 18:19:31
 */
// 引入three.js
import * as THREE from 'three';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js';

const geometry = new THREE.PlaneGeometry(1,1);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./贴图.png');

const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true, //使用背景透明的png贴图，注意开启透明计算
    side: THREE.DoubleSide, //双面可见
});

function createPointMesh(R,lon,lat) {
    const mesh = new THREE.Mesh(geometry,material);

    const coord = lon2xyz(R * 1.001, lon, lat);
    const size = R * 0.05;
    mesh.scale.set(size,size,size);
    mesh.position.set(coord.x, coord.y, coord.z); // 设置mesh位置

    const coordVec3 = new THREE.Vector3(coord.x, coord.y, coord.z).normalize();
    const meshNormal = new THREE.Vector3(0, 0, 1);
    
    mesh.quaternion.setFromUnitVectors(meshNormal,coordVec3);

    return mesh;

}


export { createPointMesh } 
