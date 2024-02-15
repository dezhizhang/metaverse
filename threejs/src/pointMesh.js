/*
 * :file description: 
 * :name: /threejs/src/pointMesh.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-09 17:50:26
 * :last editor: 张德志
 * :date last edited: 2024-02-15 10:00:22
 */
// 引入three.js
import * as THREE from 'three';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js'

// 矩形平面网格模型设置背景透明的png贴图
var geometry = new THREE.PlaneGeometry(1, 1); //默认在XOY平面上
var textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象
var texture = textureLoader.load('机场.png');
var material = new THREE.MeshBasicMaterial({
  color:0x22ffcc,
  map: texture,
  transparent: true, //使用背景透明的png贴图，注意开启透明计算
  // side: THREE.DoubleSide, //双面可见
  depthWrite:false,//禁止写入深度缓冲区数据
});

function createPointMesh(R, lon, lat) {
  const mesh = new THREE.Mesh(geometry,material);
  const coord = lon2xyz(R*1.001, lon, lat);
  const size =  R*0.05;
  mesh.scale.set(size, size, size);

  // 设置mesh位置
  mesh.position.set(coord.x, coord.y, coord.z);

  const coordVec3 = new THREE.Vector3(coord.x, coord.y, coord.z).normalize();
  const meshNormal = new THREE.Vector3(0,0,1);
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
  return mesh;

}

export { createPointMesh };