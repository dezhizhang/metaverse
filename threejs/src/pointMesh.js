/*
 * :file description: 
 * :name: /threejs/src/pointMesh.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-09 17:50:26
 * :last editor: 张德志
 * :date last edited: 2024-02-14 16:25:12
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

// 所有矩形平面mesh材质material和几何体geometry可以共享

// size:
// log，lat表示标注点的经纬度坐标
// R:标注的球面半径
function createPointMesh(R, lon, lat) {
  var mesh = new THREE.Mesh(geometry, material);
  // 经纬度转球面坐标
  var coord = lon2xyz(R*1.001, lon, lat)
  var size = R*0.05;//矩形平面Mesh的尺寸
  mesh.scale.set(size, size, size);//设置mesh大小

  //设置mesh位置
  mesh.position.set(coord.x, coord.y, coord.z);

  // mesh姿态设置
  // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
  var coordVec3 = new THREE.Vector3(coord.x, coord.y, coord.z).normalize();
  // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
  var meshNormal = new THREE.Vector3(0, 0, 1); 
  // 四元数属性.quaternion表示mesh的角度状态
  //.setFromUnitVectors();计算两个向量之间构成的四元数值
  mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);

  return mesh;
}
export { createPointMesh };