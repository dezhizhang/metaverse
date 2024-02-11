/*
 * :file description: 
 * :name: /threejs/src/ArcCurve.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-11 10:21:19
 * :last editor: 张德志
 * :date last edited: 2024-02-11 10:21:32
 */
// 引入three.js
import * as THREE from 'three';
/**
 * 创建线条模型
 */
var geometry = new THREE.BufferGeometry(); //声明一个几何体对象BufferGeometry
//参数：0, 0圆弧坐标原点x，y  50：圆弧半径    0, 2 * Math.PI：圆弧起始角度
var arc = new THREE.ArcCurve(0, 0, 50, 0, 2 * Math.PI);
// var arc = new THREE.ArcCurve(0, 0, 50, -Math.PI/3, Math.PI/2,false);//逆时针绘制一个半圆弧
// var arc = new THREE.ArcCurve(0, 0, 50, -Math.PI/3, Math.PI/2,true);//顺时针绘制一个半圆弧
//getSpacedPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
var points = arc.getSpacedPoints(50); //分段数50，返回51个顶点
// setFromPoints方法改变的是BufferGeometry.attributes.position属性
geometry.setFromPoints(points);
// console.log('查看几何体顶点坐标',geometry.attributes.position);
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0x00ffff,
});
//线条模型对象
var line = new THREE.Line(geometry, material);

export default line