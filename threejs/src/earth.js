/*
 * :file description: 
 * :name: /threejs/src/earth.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-08 15:34:42
 * :last editor: 张德志
 * :date last edited: 2024-02-18 21:22:42
 */
// 引入three.js
import * as THREE from 'three';
import config from './config.js'

var R = config.R;//地球半径
var earth = new THREE.Group();//地球组对象
earth.add(createSphereMesh(R));//球体Mesh插入earth对象中


// r：地球半径
function createSphereMesh(r) {
  var geometry = new THREE.SphereGeometry(r, 40, 40); //创建一个球体几何对象
  //材质对象Material
  var material = new THREE.MeshLambertMaterial({
    color: 0x006666,
    transparent: true,
    opacity: 0.5, //半透明用于辅助调试
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  return mesh
}

export { earth }