/*
 * :file description: 
 * :name: /threejs/src/LightPillar.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-14 16:27:38
 * :last editor: 张德志
 * :date last edited: 2024-02-14 16:38:24
 */

// 引入three.js
import * as THREE from 'three';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js'
// (地球半径R, 经度lon, 经度lat)
function createLightPillar(R, lon, lat) {
  // 矩形平面网格模型设置背景透明的png贴图
  var height = R*0.3;//光柱高度，和地球半径相关，这样调节地球半径，光柱尺寸跟着变化
  var geometry = new THREE.PlaneGeometry(R*0.05, height); //默认在XOY平面上
  geometry.rotateX(Math.PI / 2);//光柱高度方向旋转到z轴上
  geometry.translate(0, 0, height / 2);//平移使光柱底部与XOY平面重合
  var textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象
  var material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('/光柱.png'),
    color: 0x44ffaa, //光柱颜色，光柱map贴图是白色，可以通过color调节颜色   
    transparent: true, //使用背景透明的png贴图，注意开启透明计算
    side: THREE.DoubleSide, //双面可见
    depthWrite: false,//是否对深度缓冲区有任何的影响
  });
  var mesh = new THREE.Mesh(geometry, material);
  var group = new THREE.Group();
  // 两个光柱交叉叠加
  // group.add(mesh, mesh.clone().rotateY(Math.PI / 2))
  group.add(mesh, mesh.clone().rotateZ(Math.PI / 2));//几何体绕x轴旋转了，所以mesh旋转轴变为z
  // 经纬度转球面坐标
  var SphereCoord = lon2xyz(R, lon, lat);//SphereCoord球面坐标
  group.position.set(SphereCoord.x, SphereCoord.y, SphereCoord.z);//设置mesh位置
  // mesh姿态设置
  // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
  var coordVec3 = new THREE.Vector3(SphereCoord.x, SphereCoord.y, SphereCoord.z).normalize();
  // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
  var meshNormal = new THREE.Vector3(0, 0, 1);
  // 四元数属性.quaternion表示mesh的角度状态
  //.setFromUnitVectors();计算两个向量之间构成的四元数值
  group.quaternion.setFromUnitVectors(meshNormal, coordVec3);
  return group;
}


export { createLightPillar };