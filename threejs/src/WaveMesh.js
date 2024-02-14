/*
 * :file description:
 * :name: /threejs/src/WaveMesh.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-14 16:36:42
 * :last editor: 张德志
 * :date last edited: 2024-02-14 17:48:40
 */
// 引入three.js
import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(1, 1);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('标注光圈.png');

function createWaveMesh(R, lon, lat) {
  const material = new THREE.MeshBasicMaterial({
    color: 0x22ffcc,
    map: texture,
    transparent: true,
    opacity: 1.0,
    depthWrite: false, //禁止写入深度缓冲区数据
  });
  const mesh = new THREE.Mesh(geometry, material);
  const size = R * 0.12; //矩形平面Mesh的尺寸
  mesh.size = size;
  mesh.scale.set(size, size, size); // 设置mesh大小
  mesh._s = Math.random() * 1.0 + 1.0;

  return mesh;
}

export { createWaveMesh };

// 引入lon2xyz,经纬度转球面坐标

// 矩形平面网格模型设置背景透明的png贴图
// var geometry = new THREE.PlaneGeometry(1, 1); //默认在XOY平面上
// var textureLoader = new THREE.TextureLoader(); // TextureLoader创建一个纹理加载器对象
// var texture = textureLoader.load('标注光圈.png');

// 所有mesh共享几何体和纹理对象

// size:
// log，lat表示标注点的经纬度坐标
// R:标注的球面半径
// function createWaveMesh(R, lon, lat) {
//   // 如果不同mesh材质的透明度、颜色等属性同一时刻不同，材质不能共享
//   var material = new THREE.MeshBasicMaterial({
//     color:0x22ffcc,
//     map: texture,
//     transparent: true, //使用背景透明的png贴图，注意开启透明计算
//     opacity:1.0,
//     // side: THREE.DoubleSide, //双面可见
//     depthWrite:false,//禁止写入深度缓冲区数据
//   });
//   var mesh = new THREE.Mesh(geometry, material);
//   // 经纬度转球面坐标
//   // var coord = lon2xyz(R*1.001, lon, lat)
//   var size = R*0.12;//矩形平面Mesh的尺寸
//   mesh.size = size;//自顶一个属性，表示mesh静态大小
//   mesh.scale.set(size, size, size);//设置mesh大小
//   mesh._s = Math.random()*1.0 + 1.0;//自定义属性._s表示mesh在原始大小基础上放大倍数  光圈在原来mesh.size基础上1~2倍之间变化
//   // mesh.scale.set(mesh.size*mesh._s,mesh.size*mesh._s,mesh.size*mesh._s);

//   // 位置和角度不设置，作为光柱子对象即可，通过父对象光柱设置位置和角度
//   // //设置mesh位置
//   // mesh.position.set(coord.x, coord.y, coord.z);

//   // // mesh姿态设置
//   // // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
//   // var coordVec3 = new THREE.Vector3(coord.x, coord.y, coord.z).normalize();
//   // // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
//   // var meshNormal = new THREE.Vector3(0, 0, 1);
//   // // 四元数属性.quaternion表示mesh的角度状态
//   // //.setFromUnitVectors();计算两个向量之间构成的四元数值
//   // mesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);

//   return mesh;
// }
// export { createWaveMesh };
